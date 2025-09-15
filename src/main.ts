import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // If you enable Swagger elsewhere, keep it there; this is the minimal bootstrap.
  // Bind to 0.0.0.0 so it works inside Docker too.
  await app.listen(3000, '0.0.0.0');
}

// Prevent "no-floating-promises" lint error
void bootstrap();
