import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeasonDto {
  @IsNotEmpty()
  @IsNumber()
  seriesId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description?: string;
}
