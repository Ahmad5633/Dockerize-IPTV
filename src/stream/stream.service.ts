import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stream } from './stream.entity';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream)
    private readonly streamRepository: Repository<Stream>,
  ) {}

  async findAll(): Promise<Stream[]> {
    return this.streamRepository.find();
  }

  async findOne(id: number): Promise<Stream> {
    const stream = await this.streamRepository.findOneBy({ id });
    if (!stream) {
      throw new NotFoundException('Stream not found');
    }
    return stream;
  }

  //   async findEpisodeByStreamId(id: number): Promise<any> {
  //     const stream = await this.streamRepository.findOne({
  //       where: { id },
  //       relations: ['episode'],
  //     });
  //     if (!stream) {
  //       throw new NotFoundException('Stream not found');
  //     }
  //     return stream.episode;
  //   }

  //   async findUserByStreamId(id: number): Promise<any> {
  //     const stream = await this.streamRepository.findOne({
  //       where: { id },
  //       relations: ['user'],
  //     });
  //     if (!stream) {
  //       throw new NotFoundException('Stream not found');
  //     }
  //     return stream.user;
  //   }

  async update(id: number, updateData: Partial<Stream>): Promise<Stream> {
    await this.streamRepository.update(id, updateData);
    const updatedStream = await this.streamRepository.findOneBy({ id });
    if (!updatedStream) {
      throw new NotFoundException('Stream not found');
    }
    return updatedStream;
  }

  async remove(id: number): Promise<void> {
    await this.streamRepository.delete(id);
  }
}
