import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  app.setGlobalPrefix('api');

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = app.get(ConfigService);
  const isDev = config.get('NODE_ENV') !== 'production';

  app.enableCors({
    origin: isDev ? '*' : (config.get<string>('CORS_ORIGIN') ?? false),
    credentials: !isDev,
  });

  const port = config.get<number>('PORT')!;
  await app.listen(port);

  console.log(`Application running on http://localhost:${port}/api/v1`);
}

bootstrap();
