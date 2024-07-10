import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GenreSeries } from '../genre-series/genre-series.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany(() => GenreSeries, (genreSeries) => genreSeries.genre)
  genreSeries: GenreSeries[];
}
