# 🚀 NextJS + NestJS + TRPC Project template

## 🛠️ Setup and Running Instructions

### 1. 🐳 Using Docker Compose

To set up and run the project using Docker Compose:

1. Ensure you have Docker and Docker Compose installed on your system.
2. Open a terminal and navigate to the project's root directory.
3. Copy the example environment files and add appropriate environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit both `.env` files and add the necessary environment variables.

4. Run the following command:

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

This command will build and start all the necessary containers defined in the `docker-compose.dev.yml` file. It includes the database, API, and web application services. Docker Compose will handle the networking and environment setup automatically.

## 2. 📦 Using pnpm (Local Development)

To set up and run the project locally using pnpm:

1. Make sure you have Node.js (version 18 or higher) and pnpm installed on your system.
2. Open a terminal and navigate to the project's root directory.
3. Copy the example environment files and add appropriate environment variables:

   ```bash
   cp apps/web/.env.example apps/web/.env.local
   cp apps/api/.env.example apps/api/.env
   ```

   Edit both `.env` files and add the necessary environment variables.

4. Install the dependencies by running:

   ```bash
   pnpm install
   ```

5. Start the PostgreSQL database using Docker Compose:

   ```bash
   docker-compose -f docker-compose.postgres.yml up -d
   ```

6. Push the database schema changes using Prisma:

   ```bash
   pnpm run db:push
   ```

7. Start the development servers by running:

   ```bash
   pnpm run dev
   ```

This command will concurrently start both the Next.js web application (on port 8090) and the NestJS API server. It uses Turbo to manage the monorepo workspace and run the development scripts for both the web and API projects simultaneously.

Make sure your environment variables are properly configured to connect to the PostgreSQL database started by Docker Compose.

### Credits & Inspiration

- [https://github.com/tomwray13/nestjs-nextjs-trpc](https://github.com/tomwray13/nestjs-nextjs-trpc)
- [[NestJS](https://github.com/jaequery/ult)](https://github.com/jaequery/ult)
- [Panora](https://github.com/panoratech/Panora)
