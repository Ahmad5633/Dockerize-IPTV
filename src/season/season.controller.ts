import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { SeasonService } from './season.service';
import { Season } from './season.entity';
import { Episode } from '../episode/episode.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Season')
@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get()
  @ApiOperation({ summary: 'Get all seasons' })
  @ApiResponse({
    status: 200,
    description: 'Return all seasons',
    type: [Season],
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllSeasons(): Promise<Season[]> {
    return this.seasonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get season by ID' })
  @ApiParam({ name: 'id', description: 'ID of the season', type: Number })
  @ApiResponse({ status: 200, description: 'Return the season', type: Season })
  @ApiResponse({ status: 404, description: 'Season not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getSeasonById(@Param('id', ParseIntPipe) id: number): Promise<Season> {
    return this.seasonService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new season' })
  @ApiBody({ description: 'Data to create a new season', type: Season })
  @ApiResponse({
    status: 201,
    description: 'The season has been successfully created',
    type: Season,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createSeason(@Body() seasonData: Partial<Season>): Promise<Season> {
    return this.seasonService.create(seasonData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a season by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the season to update',
    type: Number,
  })
  @ApiBody({ description: 'Updated data of the season', type: Season })
  @ApiResponse({
    status: 200,
    description: 'The season has been successfully updated',
    type: Season,
  })
  @ApiResponse({ status: 404, description: 'Season not found' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateSeason(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedSeasonData: Partial<Season>,
  ): Promise<Season> {
    return this.seasonService.update(id, updatedSeasonData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a season by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the season to delete',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'The season has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Season not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteSeason(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.seasonService.delete(id);
  }

  @Get(':id/episodes')
  @ApiOperation({ summary: 'Get all episodes for a season' })
  @ApiParam({ name: 'id', description: 'ID of the season', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return all episodes for the season',
    type: [Episode],
  })
  @ApiResponse({ status: 404, description: 'Season not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getEpisodesBySeasonId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Episode[]> {
    return this.seasonService.getEpisodesBySeasonId(id);
  }
}
