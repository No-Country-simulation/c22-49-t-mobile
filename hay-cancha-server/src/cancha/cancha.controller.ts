import { Controller, Get, Query } from '@nestjs/common';
import { CanchaService } from './cancha.service';

@Controller('filters')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @Get()
  getFilters(@Query() filters: any) {
    return this.canchaService.getFilters(filters);
  }
}
