import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from './app.module';
import { kafkaConfig } from './utils/kafkaConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(kafkaConfig);
  app.startAllMicroservices();
  app.use(
    '/api/v1/user',
    createProxyMiddleware({
      target: 'http://localhost:3001',
    }),
  );
  await app.listen(3000);
}
bootstrap();
