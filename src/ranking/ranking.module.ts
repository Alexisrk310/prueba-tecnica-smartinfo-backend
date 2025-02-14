import { Module } from '@nestjs/common';
import { RankingGateway } from './ranking.gateway';
import { ScoresService } from '../scores/scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from '../scores/entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [RankingGateway, ScoresService],
})
export class RankingModule {}
