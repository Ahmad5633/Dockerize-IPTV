import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stream } from './stream.entity';
import { StreamService } from './stream.service';
import { StreamController } from './stream.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Stream])],
  providers: [StreamService],
  controllers: [StreamController],
})
export class StreamModule {}
