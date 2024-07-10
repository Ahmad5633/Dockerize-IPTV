import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  // @Post()
  // async create(@Body() createSeriesDto: CreateSeriesDto) {
  //   return this.seriesService.create(createSeriesDto);
  // }

  @Get()
  async findAll() {
    return this.seriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seriesService.findOne(id);
  }

  // @Put(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateSeriesDto: UpdateSeriesDto,
  // ) {
  //   return this.seriesService.update(id, updateSeriesDto);
  // }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.seriesService.remove(id);
  }
}
