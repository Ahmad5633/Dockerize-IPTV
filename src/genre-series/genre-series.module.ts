import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreSeries } from './genre-series.entity';
import { GenreSeriesService } from './genre-series.service';
import { GenreSeriesController } from './genre-series.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GenreSeries])],
  providers: [GenreSeriesService],
  controllers: [GenreSeriesController],
  exports: [GenreSeriesService],
})
export class GenreSeriesModule {}
