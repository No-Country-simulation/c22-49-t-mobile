import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CanchaService } from "./cancha.service";
import { CreateCanchaDto } from "./dto/CreateCancha.dto";
import { CanchaFiltersDto } from "./dto/CanchaFilters.dto";

@ApiTags("Cancha")
@Controller("cancha")
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @Post()
  async create(@Body() createCanchaDto: CreateCanchaDto) {
    return this.canchaService.create(createCanchaDto);
  }

  @Get()
  async findAll(@Query() filters: CanchaFiltersDto) {
    return this.canchaService.findAll(filters);
  }

  @Get(":id")
  async findOne(@Param("id") id:string){
    return this.canchaService.findOne(id)
  }
}
