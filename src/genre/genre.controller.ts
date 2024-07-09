import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async createGenre(@Body() genre: Genre): Promise<Genre> {
    try {
      return await this.genreService.createGenre(genre);
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllGenres(): Promise<Genre[]> {
    try {
      return await this.genreService.getAllGenres();
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findGenreById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Genre | null> {
    try {
      return await this.genreService.findGenreById(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async updateGenre(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: Partial<Genre>,
  ): Promise<Genre> {
    try {
      return await this.genreService.updateGenre(id, updateGenreDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteGenre(@Param('id', ParseIntPipe) id: number): Promise<Genre> {
    try {
      return await this.genreService.deleteGenre(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
