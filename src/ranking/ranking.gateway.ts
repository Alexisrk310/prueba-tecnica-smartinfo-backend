import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ScoresService } from '../scores/scores.service';

@WebSocketGateway()
export class RankingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private scoresService: ScoresService) {}

  @SubscribeMessage('updateRanking')
  async handleMessage(@MessageBody() data: any): Promise<void> {
    const ranking = await this.scoresService.getRanking();
    this.server.emit('rankingUpdated', ranking);
  }
}
