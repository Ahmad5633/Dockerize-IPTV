import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  original_name: string;

  @Column({ length: 255 })
  current_name: string;

  @Column({ length: 255 })
  type: string;

  @Column('text')
  path: string;

  @Column('int')
  size: number;
}
