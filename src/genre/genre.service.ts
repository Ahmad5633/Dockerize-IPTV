import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { Series } from '../series/series.entity';
import { CreateGenreDto, UpdateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,
  ) {}
  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    try {
      const genre = new Genre();
      genre.name = createGenreDto.name;
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

  async findSeriesByGenre(genreId: number): Promise<Series[]> {
    const genre = await this.genreRepository.findOne({
      where: { id: genreId },
      relations: ['genreSeries', 'genreSeries.series'],
    });

    if (!genre) {
      throw new Error('Genre not found');
    }

    return genre.genreSeries.map((gs) => gs.series);
  }

  async findSeasonsByGenre(genreId: number) {
    const genre = await this.genreRepository.findOne({
      where: { id: genreId },
      relations: [
        'genreSeries',
        'genreSeries.series',
        'genreSeries.series.seasons',
      ],
    });

    if (!genre) {
      throw new Error('Genre not found');
    }

    const seriesWithSeasons = genre.genreSeries.map((gs) => ({
      series: gs.series,
      seasons: gs.series.seasons,
    }));

    return seriesWithSeasons;
  }
}
