import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Episode } from '../episode/episode.entity';
import { User } from '../user/user.entity';

@Entity()
export class Stream extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  episode_id: number;

  @ManyToOne(() => Episode)
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  time: string;
}
