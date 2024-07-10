import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Episode } from '../episode/episode.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  currentName: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @OneToMany(() => Episode, (episode) => episode.thumbnail)
  episodes: Episode[];
}
