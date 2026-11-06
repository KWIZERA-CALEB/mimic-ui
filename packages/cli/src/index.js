import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const here = dirname(fileURLToPath(import.meta.url));
const defaults = {
	theme: 'classic',
	framework: 'react',
	language: 'typescript',
	components: 'src/components/ui',
};
const themes = ['classic', 'studio', 'minimal'];
const frameworks = ['react', 'angular', 'vue', 'react-native'];
const languages = ['typescript', 'javascript'];
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
	if (
		!themes.includes(config.theme) ||
		!frameworks.includes(config.framework) ||
		!languages.includes(config.language || 'typescript')
	)
		throw new Error('mimic.json has an unsupported theme, framework, or language.');
	return { ...config, language: config.language || 'typescript' };
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
	const framework = await choose(
		'Which framework are you using?',
		frameworks,
		defaults.framework,
	);
	const language = await choose('Which language do you prefer?', languages, defaults.language);
	const theme = await choose(
		'Which visual theme should new components use?',
		themes,
		defaults.theme,
	);
	const installMode = await choose(
		'How would you like to add components?',
		['all available components', 'one at a time'],
		'one at a time',
	);
	const config = {
		$schema: 'https://mimic-ui.dev/schema.json',
		theme,
		framework,
		language,
		components: defaults.components,
		installMode: installMode.startsWith('all') ? 'all' : 'individual',
	};
	writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
	stdout.write(`\nCreated ${configPath}\n`);
	stdout.write(`Configured ${theme} for ${framework} (${language}).\n`);
	stdout.write('Next: run `mimic list` and `mimic add button`.\n');
}

function getImplementation(item, config) {
	const implementation = item.frameworks?.[config.framework];
	if (!implementation) {
		throw new Error(`${item.name} is not available for ${config.framework}.`);
	}
	return implementation;
}

async function loadTypeScript() {
	try {
		const module = await import('typescript');
		return module.default || module;
	} catch {
		throw new Error(
			'JavaScript output needs the CLI TypeScript dependency. Reinstall @mimic-ui/cli.',
		);
	}
}

async function compileSource(content, sourcePath, outputPath, framework) {
	const ts = await loadTypeScript();
	const compilerOptions = {
		module: ts.ModuleKind.ESNext,
		target: ts.ScriptTarget.ES2022,
		jsx: ts.JsxEmit.ReactJSX,
		experimentalDecorators: true,
		emitDecoratorMetadata: false,
		esModuleInterop: true,
	};
	const transpile = (text, fileName) => {
		const result = ts.transpileModule(text, {
			compilerOptions,
			fileName,
			reportDiagnostics: true,
		});
		const errors = (result.diagnostics || []).filter(
			(diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
		);
		if (errors.length) {
			throw new Error(
				ts.formatDiagnosticsWithColorAndContext(errors, {
					getCurrentDirectory: () => process.cwd(),
					getCanonicalFileName: (fileName) => fileName,
					getNewLine: () => '\n',
				}),
			);
		}
		return result.outputText;
	};
	if (outputPath.endsWith('.vue')) {
		return content.replace(
			/<script\b([^>]*)>([\s\S]*?)<\/script>/g,
			(match, attributes, script) => {
				if (!/lang=["']ts["']/.test(attributes)) return match;
				const javascript = transpile(script, sourcePath.replace(/\.vue$/, '.ts'));
				return `<script${attributes.replace(/lang=["']ts["']/, 'lang="js"')}>${javascript}</script>`;
			},
		);
	}
	const output = transpile(
		content,
		sourcePath.endsWith('.vue') ? sourcePath.replace(/\.vue$/, '.ts') : sourcePath,
	);
	if (framework === 'angular' && !output.includes('__decorate')) {
		throw new Error(`Could not compile Angular decorators in ${sourcePath}.`);
	}
	return output;
}

function sourceFiles(item, config, implementation) {
	const files = [
		{
			source: implementation.source,
			output: implementation.output,
		},
		...(implementation.helpers || []).map((source) => ({
			source,
			output: source.split('/').at(-1),
		})),
	];
	if (config.language === 'javascript') {
		return files.map((file) => ({
			...file,
			output: file.output.replace(/\.tsx?$/, (extension) =>
				extension === '.tsx' ? '.jsx' : '.js',
			),
		}));
	}
	return files;
}

async function add(names) {
	const project = process.cwd();
	const config = readConfig(project);
	const manifestPath = join(here, '../templates/registry.json');
	const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
	const available = manifest.components.filter(
		(item) => item.theme === config.theme && item.frameworks?.[config.framework],
	);
	if (available.length === 0)
		return stdout.write(
			`There are no ${config.framework} components published for ${config.theme}.\n`,
		);
	const requested = names.length
		? names
		: config.installMode === 'all'
			? ['all']
			: [
					await choose(
						'Which component would you like to add?',
						available.map((item) => item.name),
						available[0]?.name,
					),
				];
	const selected = requested.includes('all')
		? available
		: requested.map((name) => available.find((item) => item.name === name));
	if (selected.some((item) => !item))
		throw new Error('Unknown component. Run `mimic list` to see available components.');
	const dependencies = new Set();
	const written = new Set();
	for (const item of selected) {
		const implementation = getImplementation(item, config);
		for (const dependency of implementation.dependencies || []) dependencies.add(dependency);
		for (const file of sourceFiles(item, config, implementation)) {
			const source = join(here, '../templates/components', file.source);
			if (!existsSync(source)) throw new Error(`Registry source is missing: ${file.source}`);
			const destination = resolve(project, config.components, file.output);
			if (written.has(destination)) continue;
			written.add(destination);
			let content = readFileSync(source, 'utf8');
			if (config.language === 'javascript') {
				content = await compileSource(content, source, file.output, config.framework);
			}
			if (existsSync(destination)) {
				const existing = readFileSync(destination, 'utf8');
				if (existing === content) continue;
				const overwrite = (await rl.question(`${destination} exists. Replace it? [y/N] `))
					.trim()
					.toLowerCase();
				if (overwrite !== 'y' && overwrite !== 'yes') continue;
			}
			mkdirSync(dirname(destination), { recursive: true });
			writeFileSync(destination, content, 'utf8');
			stdout.write(`Added ${item.name} → ${destination}\n`);
		}
	}
	if (dependencies.size)
		stdout.write(`Required project packages: ${[...dependencies].join(', ')}\n`);
}

function list() {
	const manifest = JSON.parse(readFileSync(join(here, '../templates/registry.json'), 'utf8'));
	let theme = null;
	try {
		theme = readConfig(process.cwd()).theme;
	} catch {
		// Listing the full registry is useful before project initialization.
	}
	const components = manifest.components.filter(
		(component) => !theme || component.theme === theme,
	);
	if (components.length === 0)
		return stdout.write(`No components are registered for ${theme}.\n`);
	for (const component of components) {
		const targets = Object.keys(component.frameworks).join(', ');
		stdout.write(`${component.name}\t${component.description}\t[${targets}]\n`);
	}
}

try {
	const [command = 'help', ...args] = process.argv.slice(2);
	if (command === 'init') await init();
	else if (command === 'add') await add(args);
	else if (command === 'list') list();
	else
		stdout.write(
			'Mimic UI CLI\n\n  mimic init          Choose theme, framework, and language\n  mimic add [name]    Copy a component into the current project\n  mimic add all       Copy all available components\n  mimic list          List components and framework targets\n',
		);
} catch (error) {
	console.error(`mimic: ${error.message}`);
	process.exitCode = 1;
} finally {
	rl.close();
}
