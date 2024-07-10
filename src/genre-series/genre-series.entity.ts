import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Genre } from '../genre/genre.entity';
import { Series } from '../series/series.entity';

@Entity()
export class GenreSeries {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genre_id: number;

  @Column()
  series_id: number;

  @ManyToOne(() => Genre, (genre) => genre.genreSeries)
  genre: Genre;

  @ManyToOne(() => Series, (series) => series.genreSeries)
  series: Series;
}

// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class GenreSeries {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   genre_id: number;

//   @Column()
//   series_id: number;
// }
