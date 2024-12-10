import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from './filter.service';

@Controller('filters')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  getFilters(@Query() filters: any) {
    return this.filterService.getFilters(filters);
  }
}




// import { Controller, Get, Query } from '@nestjs/common';
// import { FilterService } from './filter.service';

// @Controller('filters')
// export class FilterController {
//   constructor(private readonly filterService: FilterService) {}

//   @Get()
//   getFilters(@Query() filters: any) {
//     return this.filterService.getFilters(filters);
//   }
// }

//su función principal es coordinar la interacción entre las rutas y los servicios.
// Ej. Si el usuario realiza una solicitud GET/filters para obtener filtros específicos,
// el controlador FilterController recibe esa solicitu y llama al método getFilters del servicio FilterService,
// que son los parámteros enviado spor el usuario y llama al servicio para obtener los datos.
//Decoradores como @Controller para definir la ruta base.
//Métodos con decoradores como @Get, @Post, @Put, etc., que definen los endpoints y cómo procesan las solicitudes.