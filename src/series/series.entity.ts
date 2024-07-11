import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GenreSeries } from '../genre-series/genre-series.entity';
import { Season } from '../season/season.entity';

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  trailer_id: number;

  @Column({ type: 'integer' })
  thumbnail_id: number;

  @OneToMany(() => GenreSeries, (genreSeries) => genreSeries.series)
  genreSeries: GenreSeries[];

  @OneToMany(() => Season, (season) => season.series, { eager: true })
  seasons: Season[];
}
