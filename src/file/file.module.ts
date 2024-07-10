import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './file.entity';
import { multerConfig } from './multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register(multerConfig),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
