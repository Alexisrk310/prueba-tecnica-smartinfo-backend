import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { User } from 'src/users/entities/user.entity';
;

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
  ) {}

  async create(score: number, user: User): Promise<Score> {
    const newScore = this.scoresRepository.create({ score, user });
    return this.scoresRepository.save(newScore);
  }

  async getRanking(): Promise<Score[]> {
    return this.scoresRepository.find({
      relations: ['user'],
      order: { score: 'DESC' },
    });
  }
}
