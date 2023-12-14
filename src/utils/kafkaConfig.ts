import { Transport, ClientOptions } from '@nestjs/microservices';

export const kafkaConfig: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:29092'],
    },
    consumer: {
      groupId: 'retro-games-api-consumer',
    },
  },
};
