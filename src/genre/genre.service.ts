import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async createGenre(genre: Genre): Promise<Genre> {
    try {
      return await this.genreRepository.save(genre);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Genre name already exists');
      }
      throw new InternalServerErrorException('Error creating genre');
    }
  }

  async getAllGenres(): Promise<Genre[]> {
    try {
      return await this.genreRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving genres');
    }
  }

  async findGenreById(id: number): Promise<Genre | null> {
    try {
      const genre = await this.genreRepository.findOne({ where: { id } });
      if (!genre) {
        throw new NotFoundException(`Genre with ID ${id} not found`);
      }
      return genre;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving genre');
    }
  }

  async updateGenre(
    id: number,
    updateGenreDto: Partial<Genre>,
  ): Promise<Genre> {
    try {
      await this.genreRepository.update(id, updateGenreDto);
      const updatedGenre = await this.genreRepository.findOne({
        where: { id },
      });
      if (!updatedGenre) {
        throw new NotFoundException(`Genre with ID ${id} not found`);
      }
      return updatedGenre;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Genre name already exists');
      }
      throw new InternalServerErrorException('Error updating genre');
    }
  }

  async deleteGenre(id: number): Promise<Genre> {
    const genre = await this.findGenreById(id);
    try {
      await this.genreRepository.delete(id);
      return genre;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting genre');
    }
  }
}
