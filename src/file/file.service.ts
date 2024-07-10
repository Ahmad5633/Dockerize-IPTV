import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(file: File): Promise<File> {
    return await this.fileRepository.save(file);
  }

  async findAll(): Promise<File[]> {
    return await this.fileRepository.find();
  }

  async delete(id: number): Promise<void> {
    const result = await this.fileRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
  }
}
