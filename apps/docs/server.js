import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const mime = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
};
const server = createServer(async (request, response) => {
	try {
		const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
		const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
		const file = resolve(root, relative);
		if (file !== root && !file.startsWith(root + sep)) {
			response.writeHead(403).end('Forbidden');
			return;
		}
		if (!(await stat(file)).isFile()) throw new Error('Not a file');
		response.writeHead(200, {
			'Content-Type': mime[extname(file)] || 'application/octet-stream',
		});
		response.end(await readFile(file));
	} catch {
		response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
	}
});
const port = Number(process.env.PORT || 4173);
server.listen(port, '127.0.0.1', () => console.log(`Mimic UI docs at http://localhost:${port}`));
