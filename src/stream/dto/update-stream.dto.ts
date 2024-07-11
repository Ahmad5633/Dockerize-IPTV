import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateStreamDto } from '../dto/create-stream.dto';

export class UpdateStreamDto extends PartialType(CreateStreamDto) {
  @ApiProperty({ description: 'Time of the stream', required: false })
  time?: string;

  @ApiProperty({ description: 'ID of the episode', required: false })
  episodeId?: number;

  @ApiProperty({ description: 'ID of the user', required: false })
  userId?: number;
}
