import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { Series } from '../series/series.entity';
import { GenreSeries } from '../genre-series/genre-series.entity';
import { Genre } from '../genre/genre.entity';
import { Episode } from 'src/episode/episode.entity';
import { Season } from 'src/season/season.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Series, GenreSeries, Episode, Season, Genre]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
