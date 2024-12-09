import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga variables de entorno si es necesario
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', '..', 'database.sqlite'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // Sincroniza las entidades con la base de datos
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
