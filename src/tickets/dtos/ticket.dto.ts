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

  //Depecrated field
  // @ApiProperty()
  // @IsString()
  // @IsNotEmpty()
  // readonly sector: string;

  // //Depecrated field
  // @ApiProperty()
  // @IsDate()
  // @IsNotEmpty()
  // readonly date: Date;

  // //Depecrated field
  // @ApiProperty()
  // @IsDate()
  // @IsNotEmpty()
  // readonly purchaseDate: Date;

  // //Depecrated field
  // @ApiProperty()
  // @IsNumber()
  // @IsPositive()
  // readonly price: number;

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

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly ticketTypeId: number;
}

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
