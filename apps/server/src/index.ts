import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from '@fastify/cors';
import staticFiles from '@fastify/static';
import Fastify from 'fastify';
import { setupRoutes } from './routes.js';
import { setupSSR } from './ssr.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN === 'false' ? false : (process.env.CORS_ORIGIN || 'http://localhost:3000');

async function startServer() {
  const fastify = Fastify({
    logger: true,
  });

  // Setup CORS only in development
  if (CORS_ORIGIN) {
    await fastify.register(cors, {
      origin: CORS_ORIGIN,
      credentials: true,
    });
  }

  // Setup static file serving for client build
  await fastify.register(staticFiles, {
    root: path.join(__dirname, '../../client/dist'),
    prefix: '/',
  });

  // Setup API routes
  setupRoutes(fastify);

  // Setup SSR
  setupSSR(fastify);

  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server listening on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
