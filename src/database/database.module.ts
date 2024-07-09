import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { ConnectionOptions } from 'typeorm';

@Module({
  imports: [
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
          entities: [User],
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
