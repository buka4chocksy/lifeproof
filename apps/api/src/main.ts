import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port = config.get<number>('API_PORT') ?? 4000;
  const webOrigin = config.get<string>('WEB_ORIGIN') ?? 'http://localhost:3000';

  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: webOrigin,
    credentials: true,
  });
  app.enableShutdownHooks();

  await app.listen(port);
  console.log(`LifeProof API listening on http://localhost:${port}/v1`);
}

void bootstrap();
