import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    // Validar si el email ya está registrado
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const payload = { sub: user._id, name: user.name, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(loginUserDto: { email: string; password: string }) {
    const { email, password } = loginUserDto;

    // console.log({email,password});

    // Buscar al usuario por email
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    // Generar el token
    const payload = { sub: user._id, name: user.name, email: user.email };
    const token = this.jwtService.sign(payload);

    // Devolver el token y los datos del usuario
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().select("-password"); // Excluir la contraseña en la respuesta
    } catch (error) {
      throw new InternalServerErrorException("Error al pedir las canchas");
    }
  }
}
