import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      return await this.fileRepository.save(file);
    } catch (error) {
      throw new InternalServerErrorException('Could not save file');
    }
  }

  async findAll(): Promise<File[]> {
    try {
      return await this.fileRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Could not retrieve files');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const result = await this.fileRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`File with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Could not delete file');
    }
  }
}
