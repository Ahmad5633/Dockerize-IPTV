import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Series } from '../series/series.entity';
import { Episode } from '../episode/episode.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Series, (series) => series.seasons)
  series: Series;

  @OneToMany(() => Episode, (episode) => episode.season, { eager: true })
  episodes: Episode[];
}
