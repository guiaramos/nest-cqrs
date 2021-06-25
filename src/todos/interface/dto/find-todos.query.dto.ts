import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindTodosQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @ApiProperty()
  readonly skip: number;
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiProperty()
  readonly limit: number;
}
