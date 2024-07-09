import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { Request } from 'express'; // Add this import
import { Multer } from 'multer'; // Add this import

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async uploadFile(file: Multer.File): Promise<File> {
    const newFile = new File();
    newFile.original_name = file.originalname;
    newFile.current_name = file.filename; // Or use a custom naming convention if needed
    newFile.type = file.mimetype;
    newFile.path = file.path; // Or the path where you want to store files
    newFile.size = file.size;

    return await this.fileRepository.save(newFile);
  }

  async getAllFiles(): Promise<File[]> {
    return await this.fileRepository.find();
  }

  async getFileById(id: number): Promise<File> {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async updateFile(id: number, updateFileDto: Partial<File>): Promise<File> {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    await this.fileRepository.update(id, updateFileDto);
    const updatedFile = await this.fileRepository.findOneBy({ id });
    if (!updatedFile) {
      throw new NotFoundException('File not found after update');
    }
    return updatedFile;
  }

  async deleteFile(id: number): Promise<void> {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    await this.fileRepository.delete(id);
  }
}
