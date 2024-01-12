import { Controller } from '@nestjs/common';
import {
  Payload,
  MessagePattern,
  ClientKafka,
  Client,
} from '@nestjs/microservices';

import { kafkaConfig } from '../utils/kafkaConfig';
// import { BattleshipService } from './battleship.service';
// import { IJoinMatchRes } from './battleship.interface';
@Controller()
export class BattleShipController {
  @Client(kafkaConfig)
  client: ClientKafka;

  @MessagePattern('bs_game.action')
  handleAction(@Payload() payload: any) {
    console.log('bs_game.action payload ', payload);
  }
}
