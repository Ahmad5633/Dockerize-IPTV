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
import { EpisodeService } from './episode.service';
import { Episode } from './episode.entity';
import { Stream } from '../stream/stream.entity';

@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  async getAllEpisodes(): Promise<Episode[]> {
    return this.episodeService.findAll();
  }

  @Get(':id')
  async getEpisodeById(@Param('id') id: string): Promise<Episode> {
    const episodeId = parseInt(id, 10);
    return this.episodeService.findById(episodeId);
  }

  @Post()
  async createEpisode(@Body() episodeData: Partial<Episode>): Promise<Episode> {
    return this.episodeService.create(episodeData);
  }

  @Put(':id')
  async updateEpisode(
    @Param('id') id: string,
    @Body() updatedEpisodeData: Partial<Episode>,
  ): Promise<Episode> {
    const episodeId = parseInt(id, 10);
    return this.episodeService.update(episodeId, updatedEpisodeData);
  }

  @Delete(':id')
  async deleteEpisode(@Param('id') id: string): Promise<void> {
    const episodeId = parseInt(id, 10);
    await this.episodeService.delete(episodeId);
  }

  @Get(':id/streams')
  async getStreamsByEpisodeId(@Param('id') id: number): Promise<Stream[]> {
    return this.episodeService.getStreamsByEpisodeId(id);
  }
}
