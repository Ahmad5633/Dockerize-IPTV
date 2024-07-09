import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateSeriesDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  trailer_id?: number;

  @IsOptional()
  @IsInt()
  thumbnail_id?: number;
}
