import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env.development',
    }),
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '1h',
      },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilterModule } from './filters/filter.module';

@Module({
  imports: [FilterModule], // Agregado el módulo de filtros
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 862443678a8085ee38c5b1ebf33a5a0bd1a2caaa
})
export class AppModule {}
