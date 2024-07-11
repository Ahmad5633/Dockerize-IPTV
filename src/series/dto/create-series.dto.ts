import { IsString, IsNotEmpty, IsInt, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeriesDto {
  @ApiProperty({ example: 'Series Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Series Description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  trailer_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  thumbnail_id: number;
}
