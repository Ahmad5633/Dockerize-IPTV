import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Season } from '../season/season.entity';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Season)
  season: Season;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  thumbnail_id: number;
}
