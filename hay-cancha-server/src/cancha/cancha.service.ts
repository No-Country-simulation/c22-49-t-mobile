import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
}
