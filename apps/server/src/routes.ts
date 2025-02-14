import type { FastifyInstance } from 'fastify';

export function setupRoutes(fastify: FastifyInstance) {
  // Health check endpoint
  fastify.get('/api/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  });

  // SSR data endpoint
  fastify.get('/api/ssr-data', async () => {
    return {
      message: 'This data was loaded from the server',
      timestamp: new Date().toISOString(),
      serverInfo: {
        node: process.version,
        platform: process.platform,
      },
    };
  });
}
