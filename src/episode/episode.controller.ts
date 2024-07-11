import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { Episode } from './episode.entity';
import { Stream } from '../stream/stream.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Episode')
@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all episodes' })
  @ApiResponse({
    status: 200,
    description: 'Return all episodes',
    type: [Episode],
  })
  async getAllEpisodes(): Promise<Episode[]> {
    return this.episodeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get episode by ID' })
  @ApiParam({ name: 'id', description: 'ID of the episode', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return the episode',
    type: Episode,
  })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  async getEpisodeById(@Param('id') id: string): Promise<Episode> {
    const episodeId = parseInt(id, 10);
    return this.episodeService.findById(episodeId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new episode' })
  @ApiBody({ description: 'Data to create a new episode', type: Episode })
  @ApiResponse({
    status: 201,
    description: 'The episode has been successfully created',
    type: Episode,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async createEpisode(@Body() episodeData: Partial<Episode>): Promise<Episode> {
    return this.episodeService.create(episodeData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an episode by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the episode to update',
    type: Number,
  })
  @ApiBody({ description: 'Updated data of the episode', type: Episode })
  @ApiResponse({
    status: 200,
    description: 'The episode has been successfully updated',
    type: Episode,
  })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async updateEpisode(
    @Param('id') id: string,
    @Body() updatedEpisodeData: Partial<Episode>,
  ): Promise<Episode> {
    const episodeId = parseInt(id, 10);
    return this.episodeService.update(episodeId, updatedEpisodeData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an episode by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the episode to delete',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'The episode has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  async deleteEpisode(@Param('id') id: string): Promise<void> {
    const episodeId = parseInt(id, 10);
    await this.episodeService.delete(episodeId);
  }

  @Get(':id/streams')
  @ApiOperation({ summary: 'Get all streams for an episode' })
  @ApiParam({ name: 'id', description: 'ID of the episode', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return all streams for the episode',
    type: [Stream],
  })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  async getStreamsByEpisodeId(@Param('id') id: number): Promise<Stream[]> {
    return this.episodeService.getStreamsByEpisodeId(id);
  }
}
