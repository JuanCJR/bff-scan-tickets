import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsDate,
} from 'class-validator';

export class CreateTicketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly payMethod: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly sector: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly purchaseDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly customerId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly userId: number;
}

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
