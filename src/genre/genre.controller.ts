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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a new genre' })
  @ApiBody({ description: 'Data to create a new genre', type: CreateGenreDto })
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully created',
    type: Genre,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, description: 'Return all genres', type: [Genre] })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({ summary: 'Get genre by ID' })
  @ApiParam({ name: 'id', description: 'ID of the genre', type: Number })
  @ApiResponse({ status: 200, description: 'Return the genre', type: Genre })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({ summary: 'Update a genre by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the genre to update',
    type: Number,
  })
  @ApiBody({ description: 'Updated data of the genre', type: UpdateGenreDto })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully updated',
    type: Genre,
  })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({ summary: 'Delete a genre by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the genre to delete',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'The genre has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({ summary: 'Get all series for a genre' })
  @ApiParam({ name: 'id', description: 'ID of the genre', type: Number })
  @ApiResponse({ status: 200, description: 'Return all series for the genre' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
  @ApiOperation({ summary: 'Get all seasons for a genre' })
  @ApiParam({ name: 'id', description: 'ID of the genre', type: Number })
  @ApiResponse({ status: 200, description: 'Return all seasons for the genre' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
