import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Client } from '@nestjs/microservices';
import { Socket } from 'socket.io';

import { kafkaConfig } from 'src/utils/kafkaConfig';
import { IJoinMatchRes, IJsonObject } from './battleship.interface';

@Injectable()
export class BattleshipService implements OnModuleInit {
  @Client(kafkaConfig)
  client: ClientKafka;
  /**
   * this.matchSocketMap = {
   *   "matchid": {
   *     "playerId": "Socket"
   *   }
   * }
   */
  public matchSocketMap: Map<string, Map<string, Socket>>;
  public sockets: Map<string, Socket>;

  constructor() {
    this.matchSocketMap = new Map();
    this.sockets = new Map();
  }

  onModuleInit(): void {
    this.client.subscribeToResponseOf('bs_game.join');
  }

  joinMatchRequest(sockedId: string): void {
    this.client
      .send('bs_game.join', sockedId)
      .subscribe((res: IJoinMatchRes): void => {
        this.joinMatchApproved(res);
      });
  }

  joinMatchApproved({ socketId, playerId, matchId }: IJoinMatchRes): void {
    const currentSocket = this.sockets.get(socketId);
    currentSocket?.join(matchId);
    if (!this.matchSocketMap.has(matchId)) {
      this.matchSocketMap.set(matchId, new Map([[playerId, currentSocket]]));
    } else {
      const newMap = this.matchSocketMap.get(matchId);
      newMap.set(playerId, currentSocket);
      this.matchSocketMap.set(socketId, newMap);
    }
    currentSocket.emit('connectionEstablished', { playerId, matchId });
  }

  handleAction(data: IJsonObject): void {
    this.client.emit('bs_game.action', data);
  }

  addNewSocket(id: string, socket: Socket): void {
    this.sockets.set(id, socket);
  }
}
