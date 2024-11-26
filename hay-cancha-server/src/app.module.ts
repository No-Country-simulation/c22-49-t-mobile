import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilterModule } from './filters/filter.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [FilterModule, DatabaseModule], // Agregado el módulo de filtros
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
