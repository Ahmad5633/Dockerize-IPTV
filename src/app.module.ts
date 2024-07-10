import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { SeriesModule } from './series/series.module';
import { EpisodeModule } from './episode/episode.module';
import { SeasonModule } from './season/season.module';
import { FileModule } from './file/file.module';
import { StreamModule } from './stream/stream.module';
import { GenreSeriesModule } from './genre-series/genre-series.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    GenreModule,
    SeriesModule,
    EpisodeModule,
    SeasonModule,
    FileModule,
    StreamModule,
    GenreSeriesModule,
  ],
})
export class AppModule {}
