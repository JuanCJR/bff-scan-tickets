import {
    IsEmail,
    IsNotEmpty,
 
    IsDate,
    IsString,
  } from 'class-validator';
import { PartialType,ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;
  
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly rut: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly phone: string;
  
    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    readonly birthday: Date;

}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){}