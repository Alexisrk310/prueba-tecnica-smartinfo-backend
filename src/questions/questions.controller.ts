import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async findAll(@Query('category') category: string): Promise<Question[]> {
    return this.questionsService.findAll(category);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() question: Question): Promise<Question> {
    return this.questionsService.create(question);
  }
}
