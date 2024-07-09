import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { Series } from '../series/series.entity';
import { GenreSeries } from '../genre-series/genre-series.entity';
import { File } from '../file/file.entity';
import { Genre } from '../genre/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Series, GenreSeries, File, Genre])],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
