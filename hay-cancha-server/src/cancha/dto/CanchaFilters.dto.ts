import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

export class CanchaFiltersDto {
  @ApiProperty({
    description: "Filtra las canchas por ubicación",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: "Filtra las canchas por tipo",
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    description: "Filtra las canchas por precio por hora",
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  price_per_hour?: number;
}
