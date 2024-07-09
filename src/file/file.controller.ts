import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from './file.entity';
import { Multer } from 'multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File): Promise<File> {
    return this.fileService.uploadFile(file);
  }

  @Get()
  async getAllFiles(): Promise<File[]> {
    return this.fileService.getAllFiles();
  }

  @Get(':id')
  async getFileById(@Param('id') id: number): Promise<File> {
    return this.fileService.getFileById(id);
  }

  @Put(':id')
  async updateFile(
    @Param('id') id: number,
    @Body() updateFileDto: Partial<File>,
  ): Promise<File> {
    return this.fileService.updateFile(id, updateFileDto);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: number): Promise<void> {
    return this.fileService.deleteFile(id);
  }
}
