import { Module } from '@nestjs/common';
import { Transport, ClientsModule } from '@nestjs/microservices';

import { BattleshipService } from './battleship.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BATTLESHIP_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'retro-games',
            brokers: ['localhost:29092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'retro-games-consumer',
          },
        },
      },
    ]),
  ],
  providers: [BattleshipService],
  exports: [BattleshipService],
})
export class BattleshipModule {}
