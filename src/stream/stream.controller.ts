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
import { StreamService } from './stream.service';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('streams')
@Controller('streams')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @ApiOperation({ summary: 'Create a new stream' })
  @ApiResponse({
    status: 201,
    description: 'The stream has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  async create(@Body() createStreamDto: CreateStreamDto) {
    return this.streamService.create(createStreamDto);
  }

  @ApiOperation({ summary: 'Get all streams' })
  @ApiResponse({ status: 200, description: 'Return all streams.' })
  @Get()
  async findAll() {
    return this.streamService.findAll();
  }

  @ApiOperation({ summary: 'Get a stream by id' })
  @ApiResponse({ status: 200, description: 'Return the stream.' })
  @ApiResponse({ status: 404, description: 'Stream not found.' })
  @ApiParam({ name: 'id', description: 'ID of the stream' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const stream = await this.streamService.findOne(id);
    if (!stream) throw new NotFoundException('Stream not found');
    return stream;
  }

  @ApiOperation({ summary: 'Get the episode of a stream by stream id' })
  @ApiResponse({ status: 200, description: 'Return the episode.' })
  @ApiResponse({ status: 404, description: 'Stream not found.' })
  @ApiParam({ name: 'id', description: 'ID of the stream' })
  @Get(':id/episode')
  async getEpisode(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.getEpisode(id);
  }

  @ApiOperation({ summary: 'Get the user of a stream by stream id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 404, description: 'Stream not found.' })
  @ApiParam({ name: 'id', description: 'ID of the stream' })
  @Get(':id/user')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.getUser(id);
  }

  @ApiOperation({
    summary: 'Get the season of an episode of a stream by stream id',
  })
  @ApiResponse({ status: 200, description: 'Return the season.' })
  @ApiResponse({ status: 404, description: 'Stream not found.' })
  @ApiParam({ name: 'id', description: 'ID of the stream' })
  @Get(':id/episode/season')
  async getSeason(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.getSeason(id);
  }

  @ApiOperation({
    summary:
      'Get the series of a season of an episode of a stream by stream id',
  })
  @ApiResponse({ status: 200, description: 'Return the series.' })
  @ApiResponse({ status: 404, description: 'Stream not found.' })
  @ApiParam({ name: 'id', description: 'ID of the stream' })
  @Get(':id/episode/season/series')
  async getSeries(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.getSeries(id);
  }

  @ApiOperation({
    summary:
      'Get the genre of a series of a season of an episode of a stream by stream id',
  })
  @ApiResponse({ status: 200, description: 'Return the genre.' })
  @ApiResponse({ status: 404, description: 'Stream not found.' })
  @ApiParam({ name: 'id', description: 'ID of the stream' })
  @Get(':id/episode/season/series/genre')
  async getGenre(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.getGenre(id);
  }

  @ApiOperation({ summary: 'Update a stream by id' })
  @ApiResponse({
    status: 200,
    description: 'The stream has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Stream not found.' })
  @ApiParam({ name: 'id', description: 'ID of the stream' })
  @ApiBody({ type: UpdateStreamDto })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStreamDto: UpdateStreamDto,
  ) {
    return this.streamService.update(id, updateStreamDto);
  }

  @ApiOperation({ summary: 'Delete a stream by id' })
  @ApiResponse({
    status: 204,
    description: 'The stream has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Stream not found.' })
  @ApiParam({ name: 'id', description: 'ID of the stream' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.streamService.remove(id);
  }
}
