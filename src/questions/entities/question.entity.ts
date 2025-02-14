import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  question: string;

  @Column('jsonb')
  options: string[];

  @Column()
  correctAnswer: string;
}
