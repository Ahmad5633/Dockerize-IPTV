import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { GenreSeries } from './genre-series.entity';
import { GenreSeriesService } from './genre-series.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('GenreSeries')
@Controller('genre-series')
export class GenreSeriesController {
  constructor(private readonly genreSeriesService: GenreSeriesService) {}

  @Post()
  async create(
    @Body() genreSeriesData: Partial<GenreSeries>,
  ): Promise<GenreSeries> {
    return this.genreSeriesService.create(genreSeriesData);
  }

  @Get()
  async findAll(): Promise<GenreSeries[]> {
    return this.genreSeriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GenreSeries> {
    return this.genreSeriesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() genreSeriesData: Partial<GenreSeries>,
  ): Promise<GenreSeries> {
    return this.genreSeriesService.update(id, genreSeriesData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.genreSeriesService.remove(id);
  }
}
