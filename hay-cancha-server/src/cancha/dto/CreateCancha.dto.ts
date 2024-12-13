import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { CanchaEstado, CanchaTipo } from '../enums/enums';

export class CreateCanchaDto {
  @ApiProperty({
    description: 'Nombre de la cancha',
    example: 'Cancha Principal',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Ubicación de la cancha',
    example: 'Av. Siempre Viva 123',
  })
  @IsString()
  @IsNotEmpty()
  ubicación: string;

  @ApiProperty({
    description: 'Tipo de cancha',
    example: CanchaTipo.CINCO,
    enum: CanchaTipo,
  })
  @IsEnum(CanchaTipo)
  @IsNotEmpty()
  tipo: CanchaTipo;

  @ApiProperty({
    description: 'Precio por hora de uso de la cancha',
    example: 120.5,
  })
  @IsNumber()
  @IsNotEmpty()
  precio_por_hora: number;

  @ApiProperty({
    description: 'Horario de apertura de la cancha (formato HH:mm)',
    example: '08:00',
  })
  @IsString()
  @IsNotEmpty()
  horario_apertura: string;

  @ApiProperty({
    description: 'Horario de cierre de la cancha (formato HH:mm)',
    example: '22:00',
  })
  @IsString()
  @IsNotEmpty()
  horario_cierre: string;

  @ApiProperty({
    description: 'Estado actual de la cancha',
    example: CanchaEstado.DISPONIBLE,
    enum: CanchaEstado,
    default: CanchaEstado.DISPONIBLE,
  })
  @IsEnum(CanchaEstado)
  @IsNotEmpty()
  estado: CanchaEstado;

  @ApiProperty({
    description: 'URL de la imagen de la cancha',
    example: 'https://example.com/cancha.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imagen?: string;
}
