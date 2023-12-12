import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

// import { BattleshipGateway } from './battleship.gateway';

@Injectable()
export class BattleshipService {
  constructor(
    @Inject('BATTLESHIP_MICROSERVICE') private readonly client: ClientKafka,
  ) {}

  test(data: any) {
    console.log(data);
    this.client.emit('test_event', JSON.stringify({ data }));
  }
}
