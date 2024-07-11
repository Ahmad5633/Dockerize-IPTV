import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stream } from './stream.entity';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream)
    private readonly streamRepository: Repository<Stream>,
  ) {}

  async create(createStreamDto: CreateStreamDto): Promise<Stream> {
    try {
      const stream = this.streamRepository.create(createStreamDto);
      return await this.streamRepository.save(stream);
    } catch (error) {
      throw new InternalServerErrorException('Could not create stream');
    }
  }

  async findAll(): Promise<Stream[]> {
    try {
      return await this.streamRepository.find({
        relations: [
          'episode',
          'user',
          'episode.season',
          'episode.season.series',
          'episode.season.series.genreSeries',
          'episode.season.series.genreSeries.genre',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve streams');
    }
  }

  async findOne(id: number): Promise<Stream> {
    try {
      const stream = await this.streamRepository.findOne({
        where: { id },
        relations: [
          'episode',
          'episode.season',
          'episode.season.series',
          'episode.season.series.genreSeries',
          'episode.season.series.genreSeries.genre',
          'user',
        ],
      });
      if (!stream) throw new NotFoundException('Stream not found');
      return stream;
    } catch (error) {
      throw new NotFoundException('Stream not found');
    }
  }

  async getEpisode(id: number) {
    try {
      const stream = await this.findOne(id);
      return stream.episode;
    } catch (error) {
      throw new NotFoundException('Episode not found');
    }
  }

  async getUser(id: number) {
    try {
      const stream = await this.findOne(id);
      return stream.user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async getSeason(id: number) {
    try {
      const stream = await this.findOne(id);
      return stream.episode.season;
    } catch (error) {
      throw new NotFoundException('Season not found');
    }
  }

  async getSeries(id: number) {
    try {
      const stream = await this.findOne(id);
      return stream.episode.season.series;
    } catch (error) {
      throw new NotFoundException('Series not found');
    }
  }

  async getGenre(id: number) {
    try {
      const stream = await this.findOne(id);
      const genreSeries = stream.episode.season.series.genreSeries;
      if (!genreSeries || genreSeries.length === 0) {
        throw new NotFoundException('Genre not found for this series');
      }
      return genreSeries[0].genre;
    } catch (error) {
      throw new NotFoundException('Genre not found');
    }
  }

  async update(id: number, updateStreamDto: UpdateStreamDto): Promise<Stream> {
    try {
      await this.streamRepository.update(id, updateStreamDto);
      const updatedStream = await this.findOne(id);
      if (!updatedStream) throw new NotFoundException('Stream not found');
      return updatedStream;
    } catch (error) {
      throw new InternalServerErrorException('Could not update stream');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const stream = await this.findOne(id);
      if (!stream) throw new NotFoundException('Stream not found');
      await this.streamRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Could not remove stream');
    }
  }
}
