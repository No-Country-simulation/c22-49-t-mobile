import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilterModule } from './filters/filter.module';

@Module({
  imports: [FilterModule], // Agregado el módulo de filtros
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
