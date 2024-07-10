import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from './season.entity';
import { Episode } from '../episode/episode.entity';
@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season)
    private seasonRepository: Repository<Season>,
  ) {}

  async findAll(): Promise<Season[]> {
    try {
      return await this.seasonRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Unable to fetch seasons');
    }
  }

  async findById(id: number): Promise<Season> {
    try {
      const season = await this.seasonRepository.findOne({ where: { id } });
      if (!season) {
        throw new NotFoundException(`Season with ID ${id} not found`);
      }
      return season;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Unable to fetch season');
      }
    }
  }

  async create(seasonData: Partial<Season>): Promise<Season> {
    try {
      const newSeason = this.seasonRepository.create(seasonData);
      await this.seasonRepository.save(newSeason);
      return newSeason;
    } catch (error) {
      throw new InternalServerErrorException('Unable to create season');
    }
  }

  async update(
    id: number,
    updatedSeasonData: Partial<Season>,
  ): Promise<Season> {
    try {
      const season = await this.findById(id);
      this.seasonRepository.merge(season, updatedSeasonData);
      await this.seasonRepository.save(season);
      return season;
    } catch (error) {
      throw new InternalServerErrorException('Unable to update season');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const season = await this.findById(id);
      await this.seasonRepository.remove(season);
    } catch (error) {
      throw new InternalServerErrorException('Unable to delete season');
    }
  }

  async getEpisodesBySeasonId(id: number): Promise<Episode[]> {
    const season = await this.seasonRepository.findOne({
      where: { id },
      relations: ['episodes'],
    });
    return season ? season.episodes : [];
  }
}
