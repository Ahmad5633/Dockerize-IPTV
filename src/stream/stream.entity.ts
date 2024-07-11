import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Episode } from '../episode/episode.entity';
import { User } from '../user/user.entity';

@Entity()
export class Stream {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @ManyToOne(() => Episode, (episode) => episode.streams, { eager: true })
  episode: Episode;

  @ManyToOne(() => User, (user) => user.streams)
  user: User;
}
