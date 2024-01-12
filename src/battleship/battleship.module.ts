import { Module } from '@nestjs/common';

import { BattleshipService } from './battleship.service';
import { BattleshipGateway } from './battleship.gateway';
// import { BattleShipController } from './battleship.controller';

@Module({
  providers: [BattleshipGateway, BattleshipService],
  exports: [BattleshipService],
  // controllers: [BattleShipController],
})
export class BattleshipModule {}
