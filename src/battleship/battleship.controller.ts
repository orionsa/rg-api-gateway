import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Payload,
  MessagePattern,
  ClientKafka,
  Client,
} from '@nestjs/microservices';

import { kafkaConfig } from '../utils/kafkaConfig';
import { BattleshipService } from './battleship.service';
import { IJoinMatchRes } from './battleship.interface';
@Controller()
export class BattleShipController implements OnModuleInit {
  @Client(kafkaConfig)
  client: ClientKafka;
  constructor(private readonly bsService: BattleshipService) {}

  onModuleInit() {
    // this.client.subscribeToResponseOf('test_event');
  }

  @MessagePattern('bs_game.join')
  handleJoinMatchApproved(
    @Payload() { matchId, socketId, playerId }: IJoinMatchRes,
  ) {
    this.bsService.joinMatchApproved({ matchId, socketId, playerId });
  }
}
