import { BattleshipService } from './battleship.service';

import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { IJsonObject } from './battleship.interface';
@WebSocketGateway()
export class BattleshipGateway implements OnGatewayConnection {
  constructor(private readonly bsService: BattleshipService) {}

  handleConnection(client: any) {
    console.log('client.id -> ', client.id);
    this.bsService.joinMatchRequest(client.id);
  }

  @SubscribeMessage('game_action')
  handleGameAction(@MessageBody() data: IJsonObject) {
    this.bsService.handleAction(data);
  }
}
