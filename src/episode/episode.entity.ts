import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Season } from '../season/season.entity';
import { Stream } from '../stream/stream.entity';
import { File } from '../file/file.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'integer' })
  // season_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  // @Column({ type: 'integer' })
  // thumbnail_id: number;

  @ManyToOne(() => Season, (season) => season.episodes)
  season: Season;

  @ManyToOne(() => File, (file) => file.episodes, { nullable: true })
  thumbnail: File;

  @OneToMany(() => Stream, (stream) => stream.episode)
  streams: Stream[];
}
