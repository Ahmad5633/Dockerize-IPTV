import { IsNotEmpty, IsInt, MinLength, IsOptional } from 'class-validator';

export class EpisodeDto {
  @IsInt()
  @IsNotEmpty()
  season_id: number;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsInt()
  @IsNotEmpty()
  thumbnail_id: number;
}
