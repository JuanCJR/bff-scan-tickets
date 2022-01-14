import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateTicketTypeDto {
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

export class UpdateTicketType extends PartialType(CreateTicketTypeDto) {}
