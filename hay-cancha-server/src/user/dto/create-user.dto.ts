import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Nombre del usuario",
    example: "Juan",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Email del usuario",
    example: "example@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "contraseña1234",
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
