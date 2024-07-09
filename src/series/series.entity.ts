import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { File } from '../file/file.entity';

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => File, { eager: true })
  @JoinColumn({ name: 'trailer_id' })
  trailer: File;

  @ManyToOne(() => File, { eager: true })
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: File;
}
