// season.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Series } from '../series/series.entity';
@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Series)
  series: Series;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
