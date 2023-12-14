import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class BattleShipController {
  @EventPattern('bs_game.join.res')
  handleJoinGame(
    @Payload() data: { sockedId: string; playerId: string; matchId: string },
  ) {
    console.log('data!!!! -> ', data);
  }

  @EventPattern('test_event.res')
  handleTestEvent(@Payload() data: any) {
    console.log('test_event.res!!!!! => ', data);
  }
}
