import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCanchaDto } from './dto/CreateCancha.dto';

@ApiTags('Cancha')
@Controller('cancha')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @Post()
  async create(@Body()createCanchaDto: CreateCanchaDto){
    return this.canchaService.create(createCanchaDto)
  }

  @Get()
  async findAll(){
    return this.canchaService.findAll()
  }
/*   @Get()
  getFilters(@Query() filters: any) {
    return this.canchaService.getFilters(filters);
  } */
}
