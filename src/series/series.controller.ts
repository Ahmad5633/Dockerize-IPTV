import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { Series } from './series.entity';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Season } from '../season/season.entity';
import { Episode } from '../episode/episode.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new series' })
  @ApiBody({ type: CreateSeriesDto })
  @ApiResponse({
    status: 201,
    description: 'The series has been successfully created',
    type: Series,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createSeries(
    @Body() createSeriesDto: CreateSeriesDto,
  ): Promise<Series> {
    return this.seriesService.create(createSeriesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all series' })
  @ApiResponse({
    status: 200,
    description: 'Return all series',
    type: [Series],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllSeries(): Promise<Series[]> {
    return this.seriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a series by ID' })
  @ApiParam({ name: 'id', description: 'ID of the series', type: Number })
  @ApiResponse({ status: 200, description: 'Return the series', type: Series })
  @ApiResponse({ status: 404, description: 'Series not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getSeriesById(@Param('id', ParseIntPipe) id: number): Promise<Series> {
    return this.seriesService.findOne(id);
  }

  @Get(':id/seasons')
  @ApiOperation({ summary: 'Get all seasons of a series by series ID' })
  @ApiParam({ name: 'id', description: 'ID of the series', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return all seasons for the series',
    type: [Season],
  })
  @ApiResponse({ status: 404, description: 'Series not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getSeasonsBySeriesId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Season[]> {
    return this.seriesService.getSeasonsBySeriesId(id);
  }

  @Get(':id/seasons/episodes')
  @ApiOperation({ summary: 'Get all episodes of a series by series ID' })
  @ApiParam({ name: 'id', description: 'ID of the series', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return all episodes for the series',
    type: [Episode],
  })
  @ApiResponse({ status: 404, description: 'Series not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getEpisodesBySeriesId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Episode[]> {
    return this.seriesService.getEpisodesBySeriesId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a series by ID' })
  @ApiParam({ name: 'id', description: 'ID of the series', type: Number })
  @ApiBody({ type: UpdateSeriesDto })
  @ApiResponse({
    status: 200,
    description: 'The series has been successfully updated',
    type: Series,
  })
  @ApiResponse({ status: 404, description: 'Series not found' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateSeries(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ): Promise<Series> {
    return this.seriesService.update(id, updateSeriesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a series by ID' })
  @ApiParam({ name: 'id', description: 'ID of the series', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The series has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Series not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteSeries(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.seriesService.remove(id);
  }
}
