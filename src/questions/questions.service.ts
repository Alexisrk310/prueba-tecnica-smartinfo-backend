import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';

@Injectable()
export class QuestionsService {
  async create(createQuestionDto: CreateQuestionDto) {
    // Lógica para crear una pregunta
  }
}