import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;
}

export class UpdateGenreDto {
  @IsString()
  @IsOptional()
  @Length(1, 255)
  name?: string;
}
