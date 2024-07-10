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
import { SeasonService } from './season.service';
import { Season } from './season.entity';
import { Episode } from '../episode/episode.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Season')
@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get()
  async getAllSeasons(): Promise<Season[]> {
    return this.seasonService.findAll();
  }

  @Get(':id')
  async getSeasonById(@Param('id') id: string): Promise<Season> {
    const seasonId = parseInt(id, 10);
    return this.seasonService.findById(seasonId);
  }

  @Post()
  async createSeason(@Body() seasonData: Partial<Season>): Promise<Season> {
    return this.seasonService.create(seasonData);
  }

  @Put(':id')
  async updateSeason(
    @Param('id') id: string,
    @Body() updatedSeasonData: Partial<Season>,
  ): Promise<Season> {
    const seasonId = parseInt(id, 10);
    return this.seasonService.update(seasonId, updatedSeasonData);
  }

  @Delete(':id')
  async deleteSeason(@Param('id') id: string): Promise<void> {
    const seasonId = parseInt(id, 10);
    await this.seasonService.delete(seasonId);
  }

  @Get(':id/episodes')
  async getEpisodesBySeasonId(@Param('id') id: number): Promise<Episode[]> {
    return this.seasonService.getEpisodesBySeasonId(id);
  }
}
