import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from '../series/series.entity';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { File } from '../file/file.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const { trailer_id, thumbnail_id } = createSeriesDto;
    try {
      const trailer = trailer_id
        ? await this.fileRepository.findOne({ where: { id: trailer_id } })
        : null;
      const thumbnail = thumbnail_id
        ? await this.fileRepository.findOne({ where: { id: thumbnail_id } })
        : null;

      const series = this.seriesRepository.create({
        ...createSeriesDto,
        trailer,
        thumbnail,
      });
      return this.seriesRepository.save(series);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create series');
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

  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    const series = await this.findOne(id);
    const { trailer_id, thumbnail_id } = updateSeriesDto;
    try {
      if (trailer_id)
        series.trailer = await this.fileRepository.findOne({
          where: { id: trailer_id },
        });
      if (thumbnail_id)
        series.thumbnail = await this.fileRepository.findOne({
          where: { id: thumbnail_id },
        });

      this.seriesRepository.merge(series, updateSeriesDto);
      return this.seriesRepository.save(series);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update series');
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
}
