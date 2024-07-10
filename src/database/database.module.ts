import { Module, Search } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ConnectionOptions } from 'typeorm';
import { Genre } from 'src/genre/genre.entity';
import { GenreSeries } from 'src/genre-series/genre-series.entity';
import { Stream } from '../stream/stream.entity';
import { Episode } from 'src/episode/episode.entity';
import { Season } from 'src/season/season.entity';
import { Series } from 'src/series/series.entity';
import { File } from '../file/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const dbConfig: ConnectionOptions = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: configService.get<number>('DB_PORT', 5432),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [
            User,
            Stream,
            Episode,
            File,
            Genre,
            GenreSeries,
            Season,
            Series,
          ],
          synchronize: true,
        };

        try {
          await require('typeorm').createConnection(dbConfig);
          console.log('Database connection successful');
          return dbConfig;
        } catch (error) {
          console.error('Database connection error:', error.message);
          throw new Error('Failed to connect to database');
        }
      },
    }),
  ],
})
export class DatabaseModule {}
