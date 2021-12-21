import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
  } from 'class-validator';
  import { PartialType, ApiProperty } from '@nestjs/swagger';
  export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly role: string;
  
  
    
  }
  
  export class UpdateUserDto extends PartialType(CreateUserDto) {}
  