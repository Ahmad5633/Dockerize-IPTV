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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
import { CreateGenreDto, UpdateGenreDto } from './dto/create-genre.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Genre')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    try {
      return await this.genreService.createGenre(createGenreDto);
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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateGenre(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
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

  @Get(':id/series')
  async getSeriesByGenre(@Param('id', ParseIntPipe) genreId: number) {
    try {
      return this.genreService.findSeriesByGenre(genreId);
    } catch (error) {
      throw new HttpException(
        error.message,
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/series/seasons')
  async getSeasonsByGenre(@Param('id', ParseIntPipe) genreId: number) {
    try {
      return this.genreService.findSeasonsByGenre(genreId);
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
