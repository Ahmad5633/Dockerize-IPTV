import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStreamDto {
  @ApiProperty({ description: 'Time of the stream' })
  @IsNotEmpty()
  @IsString()
  time: string;

  @ApiProperty({ description: 'ID of the episode' })
  @IsNotEmpty()
  @IsInt()
  episodeId: number;

  @ApiProperty({ description: 'ID of the user' })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
