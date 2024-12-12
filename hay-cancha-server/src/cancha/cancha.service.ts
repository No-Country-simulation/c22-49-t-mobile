import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateCanchaDto } from "./dto/CreateCancha.dto";
import { Cancha } from "./schemas/cancha.schema";

interface CanchaFilters {
  location?: string;
  type?: string;
  price_per_hour?: number;
}

@Injectable()
export class CanchaService {
  constructor(@InjectModel(Cancha.name) private canchaModel: Model<Cancha>) {}

  async create(createCancha: CreateCanchaDto): Promise<Cancha> {
    try {
      const newCancha = await this.canchaModel.create(createCancha);
      return newCancha;
    } catch (error) {
      throw new InternalServerErrorException("Error al crear el producto");
    }
  }

  async findAll(filters: CanchaFilters): Promise<Cancha[]> {
    console.log(filters);

    try {
      const query: any = {};

      if (filters.location) {
        query["location"] = { $regex: filters.location, $options: "i" };
      }

      if (filters.type) {
        query["type"] = filters.type;
      }

      console.log(filters);
      
      if (filters.price_per_hour) {
        query["price_per_hour"] = { $lte: filters.price_per_hour };
      }

      return this.canchaModel.find(query);
    } catch (error) {
      throw new InternalServerErrorException("Error al pedir las canchas");
    }
  }

  async findOne(id:string){
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID de cancha inválido');
    }

    try {
      const cancha= await this.canchaModel.findById(id)
      return cancha
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error al buscar la cancha de id: ${id}`,
      );
    }
  }
}
