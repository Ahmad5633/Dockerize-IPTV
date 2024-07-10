import {
  Injectable,
  NotFoundException,
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
    private readonly seriesRepository: Repository<Series>,
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    try {
      const series = this.seriesRepository.create(createSeriesDto);
      return this.seriesRepository.save(series);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create series');
    }
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    try {
      const series = await this.findOne(id);
      this.seriesRepository.merge(series, updateSeriesDto);
      return this.seriesRepository.save(series);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update series');
    }
  }

  async findAll(): Promise<Series[]> {
    try {
      return this.seriesRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch series');
    }
  }

  async findOne(id: number): Promise<Series> {
    try {
      const series = await this.seriesRepository.findOne({ where: { id } });
      if (!series) {
        throw new NotFoundException(`Series with ID ${id} not found`);
      }
      return series;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch series');
    }
  }

  async remove(id: number): Promise<void> {
    const series = await this.findOne(id);
    try {
      await this.seriesRepository.remove(series);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete series');
    }
  }

  // async findSeasonsBySeriesId(seriesId: number): Promise<Season[]> {
  //   const series = await this.seriesRepository.findOne({
  //     where: { id: seriesId },
  //     relations: ['seasons'],
  //   });

  //   if (!series) {
  //     throw new NotFoundException('Series not found');
  //   }

  //   return series.seasons;
  // }
  async findSeasonsBySeriesId(seriesId: number): Promise<Season[]> {
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.seasons', 'seasons')
      .where('series.id = :id', { id: seriesId })
      .getOne();

    if (!series) {
      throw new NotFoundException('Series not found');
    }

    return series.seasons;
  }

  async findEpisodesBySeriesId(seriesId: number): Promise<Episode[]> {
    const seasons = await this.seasonRepository.find({
      where: { series_id: seriesId },
      relations: ['episodes'],
    });

    const episodes = seasons.reduce((acc, season) => {
      return [...acc, ...season.episodes];
    }, []);

    return episodes;
  }
}
