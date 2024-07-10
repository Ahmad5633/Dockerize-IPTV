import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreSeries } from './genre-series.entity';

@Injectable()
export class GenreSeriesService {
  constructor(
    @InjectRepository(GenreSeries)
    private readonly genreSeriesRepository: Repository<GenreSeries>,
  ) {}

  async create(genreSeriesData: Partial<GenreSeries>): Promise<GenreSeries> {
    try {
      const newGenreSeries = this.genreSeriesRepository.create(genreSeriesData);
      return await this.genreSeriesRepository.save(newGenreSeries);
    } catch (error) {
      throw new Error(`Could not create GenreSeries: ${error.message}`);
    }
  }

  async findAll(): Promise<GenreSeries[]> {
    try {
      return await this.genreSeriesRepository.find();
    } catch (error) {
      throw new Error(`Could not find GenreSeries: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<GenreSeries> {
    const genreSeries = await this.genreSeriesRepository.findOne({
      where: { id },
    });
    if (!genreSeries) {
      throw new NotFoundException('GenreSeries not found');
    }
    return genreSeries;
  }

  async update(
    id: number,
    genreSeriesData: Partial<GenreSeries>,
  ): Promise<GenreSeries> {
    let genreSeries = await this.findOne(id);
    await this.genreSeriesRepository.merge(genreSeries, genreSeriesData);
    await this.genreSeriesRepository.save(genreSeries);
    return genreSeries;
  }

  async remove(id: number): Promise<void> {
    const genreSeries = await this.findOne(id);
    await this.genreSeriesRepository.remove(genreSeries);
  }
}
