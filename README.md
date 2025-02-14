# BFF POC Demo Application

This is a proof-of-concept application demonstrating the Backend-for-Frontend (BFF) architecture with React SPA and SSR capabilities.

## Project Structure

The project is organized as a monorepo using Turborepo with the following packages:

- `apps/client`: React SPA application
- `apps/server`: BFF Node.js server (Fastify + TypeScript)
- `packages/shared`: Shared types and utilities

## Features

- React SPA application served through BFF
- Server-side rendering (SSR) example page
- TypeScript support throughout the stack
- API aggregation and proxying
- Shared types between frontend and backend
- Development and production Docker configurations

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Docker and Docker Compose (for production deployment)

## Development Setup

1. Install dependencies:
```bash
pnpm install
```

2. Start the development servers:
```bash
pnpm dev
```

This will start:
- Client development server on http://localhost:3000
- BFF server on http://localhost:4000

## Production Build

1. Build all packages:
```bash
pnpm build
```

2. Using Docker:
```bash
docker-compose up --build
```

The application will be available at http://localhost:4000

## Project Structure Details

### Client (`apps/client`)
- React SPA application
- Uses Vite for development and building
- Example SSR page implementation
- API integration with BFF

### Server (`apps/server`)
- Fastify-based BFF server
- TypeScript implementation
- Serves SPA static files
- Handles API proxying and aggregation
- Implements SSR for specific routes

### Shared (`packages/shared`)
- Common TypeScript interfaces
- Shared utilities
- API response types

## Available Scripts

- `pnpm dev`: Start development servers
- `pnpm build`: Build all packages
- `pnpm lint`: Run linting
- `pnpm test`: Run tests
- `pnpm clean`: Clean build artifacts

## Environment Variables

Create `.env` files in respective directories:

### Client (.env)
```
VITE_API_URL=http://localhost:4000/api
```

### Server (.env)
```
PORT=4000
NODE_ENV=development
```

## API Documentation

The BFF server provides the following endpoints:

- `GET /api/health`: Health check endpoint
- `GET /api/data`: Example data endpoint
- `GET /ssr-example`: Server-side rendered example page

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT 