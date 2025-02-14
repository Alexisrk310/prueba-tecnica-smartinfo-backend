import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { User } from '../users/entities/user.entity';

@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body('score') score: number, @Req() req): Promise<void> {
    const user = req.user;
    await this.scoresService.create(score, user);
  }

  @Get('ranking')
  async getRanking(): Promise<any> {
    return this.scoresService.getRanking();
  }
}
