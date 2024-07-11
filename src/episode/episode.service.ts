import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './episode.entity';
import { Stream } from '../stream/stream.entity';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
  ) {}

  async findAll(): Promise<Episode[]> {
    try {
      return await this.episodeRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch episodes');
    }
  }

  async findById(id: number): Promise<Episode> {
    try {
      const episode = await this.episodeRepository.findOne({ where: { id } });
      if (!episode) {
        throw new NotFoundException(`Episode with ID ${id} not found`);
      }
      return episode;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Unable to fetch episode');
      }
    }
  }

  async create(episodeData: Partial<Episode>): Promise<Episode> {
    try {
      const newEpisode = this.episodeRepository.create(episodeData);
      await this.episodeRepository.save(newEpisode);
      return newEpisode;
    } catch (error) {
      throw new InternalServerErrorException('Unable to create episode');
    }
  }

  async update(
    id: number,
    updatedEpisodeData: Partial<Episode>,
  ): Promise<Episode> {
    try {
      const episode = await this.findById(id);
      this.episodeRepository.merge(episode, updatedEpisodeData);
      await this.episodeRepository.save(episode);
      return episode;
    } catch (error) {
      throw new InternalServerErrorException('Unable to update episode');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const episode = await this.findById(id);
      await this.episodeRepository.remove(episode);
    } catch (error) {
      throw new InternalServerErrorException('Unable to delete episode');
    }
  }

  async getStreamsByEpisodeId(id: number): Promise<Stream[]> {
    try {
      const episode = await this.episodeRepository.findOne({
        where: { id },
        relations: ['streams'],
      });
      return episode ? episode.streams : [];
    } catch (error) {
      throw new InternalServerErrorException(
        'Unable to fetch streams for episode',
      );
    }
  }
}
