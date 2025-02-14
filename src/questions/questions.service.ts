import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async findAll(category?: string): Promise<Question[]> {
    if (category) {
      return this.questionsRepository.find({ where: { category } });
    }
    return this.questionsRepository.find();
  }

  async create(question: Question): Promise<Question> {
    return this.questionsRepository.save(question);
  }
}
