import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = join(root, 'registry/themes/classic');
const destination = join(root, 'packages/cli/templates/components/classic');
mkdirSync(destination, { recursive: true });
for (const framework of readdirSync(source)) {
	const sourcePath = join(source, framework, 'typescript');
	if (!existsSync(sourcePath)) continue;
	const destinationPath = join(destination, framework, 'typescript');
	rmSync(destinationPath, { recursive: true, force: true });
	cpSync(sourcePath, destinationPath, { recursive: true });
}
console.log('Synchronized classic theme sources to the CLI package.');
