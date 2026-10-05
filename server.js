import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDirectory = fileURLToPath(new URL('./public/', import.meta.url));
const port = Number.parseInt(process.env.PORT ?? '3000', 10);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
]);

function applySecurityHeaders(response) {
  response.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data:; style-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
}

function sendText(response, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(statusCode, { 'Content-Type': contentType });
  response.end(body);
}

const server = createServer(async (request, response) => {
  applySecurityHeaders(response);

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    sendText(response, 405, 'Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  } catch {
    sendText(response, 400, 'Bad request');
    return;
  }

  if (pathname === '/health') {
    sendText(response, 200, JSON.stringify({ status: 'ok' }), 'application/json; charset=utf-8');
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  if (pathname === '/favicon.ico') pathname = '/favicon.svg';

  const filePath = path.resolve(publicDirectory, `.${pathname}`);
  if (!filePath.startsWith(publicDirectory)) {
    sendText(response, 403, 'Forbidden');
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) throw new Error('Not a file');

    const extension = path.extname(filePath).toLowerCase();
    response.statusCode = 200;
    response.setHeader('Content-Type', contentTypes.get(extension) ?? 'application/octet-stream');
    response.setHeader(
      'Cache-Control',
      extension === '.html' ? 'no-cache' : 'public, max-age=86400, stale-while-revalidate=604800',
    );
    response.setHeader('Content-Length', fileStats.size);

    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    sendText(response, 404, 'Not found');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`CCI DMV is listening on port ${port}`);
});

function shutDown() {
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);
