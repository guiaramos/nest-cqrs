import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoBodyDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly content: string;
}
