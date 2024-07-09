import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Series } from '../series/series.entity';
import { Genre } from '../genre/genre.entity';

@Entity()
export class GenreSeries {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Genre, { eager: true })
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;

  @ManyToOne(() => Series, { eager: true })
  @JoinColumn({ name: 'series_id' })
  series: Series;
}
