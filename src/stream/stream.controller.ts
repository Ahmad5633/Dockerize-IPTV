import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { Stream } from './stream.entity';
import { Episode } from 'src/episode/episode.entity';
import { Season } from 'src/season/season.entity';

@Controller('streams')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Post()
  async createStream(@Body() streamData: Partial<Stream>): Promise<Stream> {
    return this.streamService.create(streamData);
  }

  @Get()
  findAll(): Promise<Stream[]> {
    return this.streamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Stream> {
    return this.streamService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Stream>,
  ): Promise<Stream> {
    return this.streamService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.streamService.remove(+id);
  }

  @Get(':id/episode')
  async getEpisodeByStreamId(
    @Param('id', ParseIntPipe) streamId: number,
  ): Promise<Episode> {
    return this.streamService.findEpisodeByStreamId(streamId);
  }

  @Get(':id/user')
  async getUserByStreamId(@Param('id', ParseIntPipe) streamId: number) {
    return this.streamService.findUserByStreamId(streamId);
  }

  @Get(':id/episode/season')
  async getSeasonByEpisodeId(
    @Param('id', ParseIntPipe) streamId: number,
  ): Promise<Season> {
    return this.streamService.findSeasonByEpisodeId(streamId);
  }

  @Get(':id/episode/season/series')
  async getSeriesBySeasonId(@Param('id', ParseIntPipe) streamId: number) {
    return this.streamService.findSeriesBySeasonId(streamId);
  }

  @Get(':id/episode/season/series/genre')
  async getGenreBySeriesId(@Param('id', ParseIntPipe) streamId: number) {
    return this.streamService.findGenreBySeriesId(streamId);
  }
}
