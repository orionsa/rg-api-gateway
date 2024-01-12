import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { BattleshipService } from './battleship.service';
import { IJsonObject } from './battleship.interface';
@WebSocketGateway()
export class BattleshipGateway implements OnGatewayConnection {
  constructor(private readonly bsService: BattleshipService) {}

  handleConnection(socket: Socket) {
    this.bsService.addNewSocket(socket.id, socket);
    this.bsService.joinMatchRequest(socket.id);
  }

  @SubscribeMessage('game_action')
  handleGameAction(@MessageBody() data: IJsonObject) {
    this.bsService.handleAction(data);
  }
}
