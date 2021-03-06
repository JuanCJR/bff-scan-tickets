import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto,UpdateCustomerDto } from '../dtos/customer.dto';
import { CustomersService } from '../services/customers.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('customers')
@Controller('customers')
export class CustomersController {

    constructor( private customerService:CustomersService){}
    @Get()
    find() {
      return this.customerService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.customerService.findById(id);
    }


  @Get('exists/:rut')
  validaExists(@Param('rut') rut: string) {
    return this.customerService.validaExists(rut);
  }
  
    @Post()
    create(@Body() payload: CreateCustomerDto) {
      return this.customerService.create(payload);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() payload: UpdateCustomerDto,
    ) {
      return this.customerService.update(id, payload);
    }
  
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.customerService.remove(id);
    }

}
