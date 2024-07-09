import { Controller, Get, Param, Patch, Delete, Body } from '@nestjs/common';
import { StreamService } from './stream.service';
import { Stream } from './stream.entity';

@Controller('streams')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Get()
  findAll(): Promise<Stream[]> {
    return this.streamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Stream> {
    return this.streamService.findOne(+id);
  }

  @Get(':id/episode')
  findEpisodeByStreamId(@Param('id') id: string): Promise<any> {
    return this.streamService.findEpisodeByStreamId(+id);
  }

  @Get(':id/user')
  findUserByStreamId(@Param('id') id: string): Promise<any> {
    return this.streamService.findUserByStreamId(+id);
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
}
