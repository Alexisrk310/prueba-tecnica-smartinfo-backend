import { Controller, Post, Body, Get, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { Score } from './entities/score.entity';
import { User } from 'src/users/entities/user.entity';

@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body('score') score: number, @Req() req): Promise<Score> {
    console.log('Usuario autenticado:', req.user); // <-- Ver si llega el usuario

    if (!req.user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (typeof score !== 'number') {
      throw new HttpException('Invalid score value', HttpStatus.BAD_REQUEST);
    }

    return await this.scoresService.create(score, req.user);
  }

  @Get('ranking')
  async getRanking(): Promise<Score[]> {
    try {
      return await this.scoresService.getRanking();
    } catch (error) {
      throw new HttpException('Failed to retrieve ranking', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
