import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Genre } from './genre.entity';
import { GenreSeries } from '../genre-series/genre-series.entity';
import { Series } from '../series/series.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, GenreSeries, Series])],
  providers: [GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
