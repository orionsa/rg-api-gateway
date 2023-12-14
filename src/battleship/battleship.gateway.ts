import { BattleshipService } from './battleship.service';

import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';

@WebSocketGateway()
export class BattleshipGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private readonly bsService: BattleshipService) {}

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): void {
    this.bsService.test(data);
    // return data;
  }

  handleConnection(client: any) {
    console.log('client.id -> ', client.id);
    this.bsService.handleNewConnection(client.id);
  }

  afterInit() {
    console.log('onInit?!?!11111111');
  }
}
