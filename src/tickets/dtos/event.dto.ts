import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly site: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly eventDate: Date;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
