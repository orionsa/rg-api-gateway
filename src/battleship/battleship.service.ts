import { Injectable } from '@nestjs/common';
import { ClientKafka, Client } from '@nestjs/microservices';

import { kafkaConfig } from 'src/utils/kafkaConfig';
import { IJoinMatchRes, IJsonObject } from './battleship.interface';

@Injectable()
export class BattleshipService {
  @Client(kafkaConfig)
  client: ClientKafka;
  /**
   * this.matchSocketMap = {
   *   "matchid": {
   *     "playerId": "socketId"
   *   }
   * }
   */
  public matchSocketMap: Map<string, Map<string, string>>;
  constructor() {
    this.matchSocketMap = new Map();
  }

  joinMatchRequest(sockedId: string): void {
    console.log('handleNewConnection with id ', sockedId);
    this.client.emit('bs_game.join', sockedId);
  }

  joinMatchApproved({ socketId, playerId, matchId }: IJoinMatchRes): void {
    if (!this.matchSocketMap.has(matchId)) {
      this.matchSocketMap.set(matchId, new Map([[playerId, socketId]]));
      return;
    }

    const newMap = this.matchSocketMap.get(matchId);
    newMap.set(playerId, socketId);
    this.matchSocketMap.set(socketId, newMap);
  }

  handleAction(data: IJsonObject): void {
    this.client.emit('bs_game.action', data);
  }
}
