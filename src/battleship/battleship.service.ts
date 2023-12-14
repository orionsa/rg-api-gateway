import { Injectable } from '@nestjs/common';
import { ClientKafka, Client } from '@nestjs/microservices';

import { kafkaConfig } from 'src/utils/kafkaConfig';

@Injectable()
export class BattleshipService {
  @Client(kafkaConfig)
  client: ClientKafka;

  test(data: any) {
    console.log(data);
    this.client.emit('test_event', JSON.stringify({ data }));
  }

  handleNewConnection(sockedId): void {
    console.log('handleNewConnection with id ', sockedId);
    this.client.emit('bs_game.join.req', { sockedId });
  }
}
