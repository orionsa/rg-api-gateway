import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { kafkaConfig } from './utils/kafkaConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(kafkaConfig);
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
