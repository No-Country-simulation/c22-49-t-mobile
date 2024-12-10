import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { CanchaEstado, Deporte } from "../enums/enums";
import { Type } from "class-transformer";

export class AddressDto {
  @ApiProperty({
    description: "Nombre de la calle",
    example: "Av. Siempre Viva",
  })
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty({
    description: "Altura de la calle",
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  streetNumber: number;
}

export class CreateCanchaDto {
  @ApiProperty({
    description: "Nombre de la cancha",
    example: "Futbol",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Ubicación de la cancha",
    example: "Palermo",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: "Tipo de cancha",
    example: Deporte.FULTOL,
    enum: Deporte,
  })
  @IsEnum(Deporte)
  @IsNotEmpty()
  type: Deporte;

  @ApiProperty({
    description: "Precio por hora de uso de la cancha",
    example: 20000,
  })
  @IsNumber()
  @IsNotEmpty()
  price_per_hour: number;

  @ApiProperty({
    description: "Horario de apertura de la cancha (formato HH:mm)",
    example: "08:00",
  })
  @IsString()
  @IsNotEmpty()
  opening_hours: string;

  @ApiProperty({
    description: "Horario de cierre de la cancha (formato HH:mm)",
    example: "22:00",
  })
  @IsString()
  @IsNotEmpty()
  closing_time: string;

  @ApiProperty({
    description: "Estado actual de la cancha",
    example: CanchaEstado.DISPONIBLE,
    enum: CanchaEstado,
    default: CanchaEstado.DISPONIBLE,
  })
  @IsEnum(CanchaEstado)
  @IsNotEmpty()
  state: CanchaEstado;

  @ApiProperty({
    description: "URLs de las imágenes de la cancha",
    example: [
      "https://www.generallavalle.gob.ar/fotos/noticias/futbol-protocolo-deportes-49.jpg",
      "https://www.generallavalle.gob.ar/fotos/noticias/futbol-protocolo-deportes-49.jpg",
    ],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiProperty({
    description: "Dirección de la cancha",
    type: AddressDto,
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;
}
