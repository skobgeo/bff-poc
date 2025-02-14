import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FastifyInstance } from 'fastify';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../../client/src/App.js';

export function setupSSR(fastify: FastifyInstance) {
  fastify.get('/ssr-example', async (request, reply) => {
    const queryClient = new QueryClient();

    // Pre-fetch data that would be needed for SSR
    await queryClient.prefetchQuery({
      queryKey: ['ssr-data'],
      queryFn: async () => {
        return {
          message: 'This data was pre-fetched during SSR',
          timestamp: new Date().toISOString(),
          serverInfo: {
            node: process.version,
            platform: process.platform,
          },
        };
      },
    });

    const html = ReactDOMServer.renderToString(
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={request.url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    );

    const dehydratedState = JSON.stringify(queryClient.getQueryData(['ssr-data']));

    // Send the rendered HTML with the dehydrated state
    reply.type('text/html').send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>BFF POC - SSR Example</title>
          <link rel="stylesheet" href="/assets/index.css">
          <script>
            window.__INITIAL_DATA__ = ${dehydratedState};
          </script>
        </head>
        <body>
          <div id="root">${html}</div>
          <script type="module" src="/assets/index.js"></script>
        </body>
      </html>
    `);
  });
}
