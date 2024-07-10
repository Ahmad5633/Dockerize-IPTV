import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stream } from './stream.entity';
import { Season } from '../season/season.entity';
import { Genre } from '../genre/genre.entity';

@Injectable()
export class StreamService {
  constructor(
    @InjectRepository(Stream)
    private readonly streamRepository: Repository<Stream>,
  ) {}

  async create(streamData: Partial<Stream>): Promise<Stream> {
    try {
      const newStream = this.streamRepository.create(streamData);
      await this.streamRepository.save(newStream);
      return newStream;
    } catch (error) {
      throw new InternalServerErrorException('Unable to create stream');
    }
  }
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

  async update(id: number, updateData: Partial<Stream>): Promise<Stream> {
    await this.streamRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const stream = await this.findOne(id);
    await this.streamRepository.remove(stream);
  }

  async findEpisodeByStreamId(id: number): Promise<any> {
    const stream = await this.findOne(id);
    return stream.episode;
  }

  async findUserByStreamId(id: number): Promise<any> {
    const stream = await this.findOne(id);
    return stream.user;
  }

  async findSeasonByEpisodeId(streamId: number): Promise<Season> {
    const stream = await this.streamRepository.findOne({
      where: { id: streamId },
      relations: ['episode', 'episode.season'],
    });
    if (!stream || !stream.episode || !stream.episode.season) {
      throw new NotFoundException(
        `Season for episode of stream with ID ${streamId} not found`,
      );
    }
    return stream.episode.season;
  }

  async findSeriesBySeasonId(streamId: number) {
    const stream = await this.streamRepository.findOne({
      where: { id: streamId },
      relations: ['episode', 'episode.season', 'episode.season.series'],
    });
    if (
      !stream ||
      !stream.episode ||
      !stream.episode.season ||
      !stream.episode.season.series
    ) {
      throw new NotFoundException(
        `Series for season of episode of stream with ID ${streamId} not found`,
      );
    }
    return stream.episode.season.series;
  }

  async findGenreBySeriesId(streamId: number): Promise<Genre> {
    const stream = await this.streamRepository.findOne({
      where: { id: streamId },
      relations: [
        'episode',
        'episode.season',
        'episode.season.series',
        'episode.season.series.genreSeries',
        'episode.season.series.genreSeries.genre',
      ],
    });
    if (
      !stream ||
      !stream.episode ||
      !stream.episode.season ||
      !stream.episode.season.series ||
      !stream.episode.season.series.genreSeries ||
      !stream.episode.season.series.genreSeries[0] ||
      !stream.episode.season.series.genreSeries[0].genre
    ) {
      throw new NotFoundException(
        `Genre for series of season of episode of stream with ID ${streamId} not found`,
      );
    }
    return stream.episode.season.series.genreSeries[0].genre;
  }
}
