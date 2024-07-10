import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Stream } from '../stream/stream.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  first_name: string;
  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  last_name: string;
  @ApiProperty()
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;
  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;
  @ApiProperty()
  @OneToMany(() => Stream, (stream) => stream.user)
  streams: Stream[];
}
