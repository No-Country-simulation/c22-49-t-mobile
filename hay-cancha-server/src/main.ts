import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  
  // Configuración de swagger
  const config = new DocumentBuilder()
    .setTitle('Documentacion')
    .setDescription('CanchaApp')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, documentFactory);

  // Cualquier web puede pedir informacion
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
