// /Users/thiagotavares/Projects/Services/apps/api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  // eslint-disable-next-line no-console
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  // eslint-disable-next-line no-console
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

void bootstrap();
