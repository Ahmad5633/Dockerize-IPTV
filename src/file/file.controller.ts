import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from './file.entity';
import { multerConfig } from './multer.config';
import { MulterFile } from 'multer';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: MulterFile): Promise<File> {
    const newFile: Partial<File> = {
      originalName: file.originalname,
      currentName: file.filename,
      type: file.mimetype,
      path: file.path,
      size: file.size,
    };
    return await this.fileService.create(newFile as File);
  }

  @Get()
  async getAllFiles(): Promise<File[]> {
    return await this.fileService.findAll();
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    await this.fileService.delete(+id);
  }
}
