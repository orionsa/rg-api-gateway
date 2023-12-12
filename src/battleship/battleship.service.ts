import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

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
