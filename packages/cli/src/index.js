#!/usr/bin/env node
import { existsSync, readFileSync, mkdirSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const here = dirname(fileURLToPath(import.meta.url));
const defaults = {
	theme: 'classic',
	framework: 'react',
	components: 'src/components/ui',
	utils: 'src/lib/mimic.ts',
};
const themes = ['classic', 'studio', 'minimal'];
const frameworks = ['react', 'angular', 'vue', 'svelte', 'react-native'];
const rl = readline.createInterface({ input: stdin, output: stdout });

async function choose(label, options, fallback) {
	stdout.write(`${label}\n`);
	options.forEach((option, index) =>
		stdout.write(`  ${index + 1}) ${option}${option === fallback ? ' (default)' : ''}\n`),
	);
	const answer = (
		await rl.question(`Choose 1-${options.length} [${options.indexOf(fallback) + 1}]: `)
	).trim();
	if (!answer) return fallback;
	const value = Number(answer);
	if (!Number.isInteger(value) || value < 1 || value > options.length)
		throw new Error('That choice is not in the list.');
	return options[value - 1];
}

function readConfig(project) {
	const file = join(project, 'mimic.json');
	if (!existsSync(file)) throw new Error('mimic.json not found. Run `mimic init` first.');
	const config = JSON.parse(readFileSync(file, 'utf8'));
	if (!themes.includes(config.theme) || !frameworks.includes(config.framework))
		throw new Error('mimic.json has an unsupported theme or framework.');
	return config;
}

async function init() {
	const project = process.cwd();
	const configPath = join(project, 'mimic.json');
	if (existsSync(configPath)) {
		const overwrite = (await rl.question('mimic.json already exists. Replace it? [y/N] '))
			.trim()
			.toLowerCase();
		if (overwrite !== 'y' && overwrite !== 'yes')
			return stdout.write('Kept the existing configuration.\n');
	}
	const framework = await choose('Which framework are you using?', frameworks, 'react');
	const theme = await choose('Which visual theme should new components use?', themes, 'classic');
	const installMode = await choose(
		'How would you like to add components?',
		['all available components', 'one at a time'],
		'one at a time',
	);
	const config = {
		$schema: 'https://mimic-ui.dev/schema.json',
		theme,
		framework,
		components: defaults.components,
		utils: defaults.utils,
		installMode: installMode.startsWith('all') ? 'all' : 'individual',
	};
	writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
	stdout.write(`\nCreated ${configPath}\n`);
	stdout.write(
		'No component implementations are published yet. Add your theme files under registry/themes/<theme>/<framework>.\n',
	);
	stdout.write(
		'When a component is ready, register its source path in the CLI registry manifest.\n',
	);
	stdout.write('Next: run `mimic list` to see available components.\n');
}

async function add(names) {
	const project = process.cwd();
	const config = readConfig(project);
	const manifestPath = join(here, '../templates/registry.json');
	const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
	if (manifest.components.length === 0)
		return stdout.write(
			'There are no published components yet. Theme source folders are ready for your implementations.\n',
		);
	const requested = names.length
		? names
		: config.installMode === 'all'
			? ['all']
			: [
					await choose(
						'Which component would you like to add?',
						manifest.components.map((item) => item.name),
						manifest.components[0]?.name,
					),
				];
	const selected = requested.includes('all')
		? manifest.components
		: requested.map((name) => manifest.components.find((item) => item.name === name));
	if (selected.some((item) => !item))
		throw new Error(`Unknown component. Run \`mimic list\` to see available components.`);
	if (selected.length === 0)
		return stdout.write(
			'There are no published components yet. Theme source folders are ready for your implementations.\n',
		);
	for (const item of selected) {
		const source = join(
			here,
			'../templates/components',
			config.theme,
			config.framework,
			item.file,
		);
		if (!existsSync(source)) {
			stdout.write(
				`Skipped ${item.name}: no ${config.theme}/${config.framework} implementation is published.\n`,
			);
			continue;
		}
		const destination = resolve(project, config.components, item.file);
		if (existsSync(destination)) {
			const overwrite = (await rl.question(`${destination} exists. Replace it? [y/N] `))
				.trim()
				.toLowerCase();
			if (overwrite !== 'y' && overwrite !== 'yes') continue;
		}
		mkdirSync(dirname(destination), { recursive: true });
		cpSync(source, destination);
		stdout.write(`Added ${item.name} → ${destination}\n`);
	}
}

function list() {
	const manifest = JSON.parse(readFileSync(join(here, '../templates/registry.json'), 'utf8'));
	if (!manifest.components.length)
		return stdout.write(
			'No components are published yet.\n\nAdd implementations under registry/themes/<theme>/<framework>, then list them in packages/cli/templates/registry.json.\n',
		);
	for (const component of manifest.components)
		stdout.write(`${component.name}\t${component.description}\n`);
}

try {
	const [command = 'help', ...args] = process.argv.slice(2);
	if (command === 'init') await init();
	else if (command === 'add') await add(args);
	else if (command === 'list') list();
	else
		stdout.write(
			'Mimic UI CLI\n\n  mimic init          Set up theme, framework, and component preferences\n  mimic add [name]    Copy a component into the current project\n  mimic list          Show published components\n',
		);
} catch (error) {
	console.error(`mimic: ${error.message}`);
	process.exitCode = 1;
} finally {
	rl.close();
}
