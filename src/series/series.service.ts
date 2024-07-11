import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './series.entity';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Season } from '../season/season.entity';
import { Episode } from '../episode/episode.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
    @InjectRepository(Season)
    private seasonRepository: Repository<Season>,
  ) {}

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    try {
      const series = this.seriesRepository.create(createSeriesDto);
      return await this.seriesRepository.save(series);
    } catch (error) {
      throw new InternalServerErrorException('Could not create series');
    }
  }

  async findAll(): Promise<Series[]> {
    try {
      return await this.seriesRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve series');
    }
  }

  async findOne(id: number): Promise<Series> {
    try {
      const series = await this.seriesRepository.findOneBy({ id });
      if (!series) {
        throw new NotFoundException(`Series with ID ${id} not found`);
      }
      return series;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve series');
    }
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    try {
      await this.seriesRepository.update(id, updateSeriesDto);
      const updatedSeries = await this.seriesRepository.findOneBy({ id });
      if (!updatedSeries) {
        throw new NotFoundException(`Series with ID ${id} not found`);
      }
      return updatedSeries;
    } catch (error) {
      throw new InternalServerErrorException('Could not update series');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.seriesRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Series with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Could not delete series');
    }
  }

  async getSeasonsBySeriesId(seriesId: number): Promise<Season[]> {
    try {
      const seasons = await this.seasonRepository.find({
        where: { series: { id: seriesId } },
      });
      if (seasons.length === 0) {
        throw new NotFoundException(
          `No seasons found for series with ID ${seriesId}`,
        );
      }
      return seasons;
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve seasons');
    }
  }

  async getEpisodesBySeriesId(seriesId: number): Promise<Episode[]> {
    try {
      const series = await this.seriesRepository.findOne({
        where: { id: seriesId },
        relations: ['seasons', 'seasons.episodes'],
      });
      if (!series) {
        throw new NotFoundException(`Series with ID ${seriesId} not found`);
      }
      return series.seasons.flatMap((season) => season.episodes);
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve episodes');
    }
  }
}
