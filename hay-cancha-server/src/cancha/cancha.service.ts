import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCanchaDto } from "./dto/CreateCancha.dto";
import { Cancha } from "./schemas/cancha.schema";

interface CanchaFilters {
  ubicacion?: string;
  tipo?: string;
  precio_por_hora?: number;
}

@Injectable()
export class CanchaService {
  constructor(@InjectModel(Cancha.name) private canchaModel: Model<Cancha>) {}
  /*   private canchas = [
    { id: 1, name: 'Cancha A', location: 'Santiago', price: 20, players: 5 },
    { id: 2, name: 'Cancha B', location: 'Valparaíso', price: 25, players: 7 },
  ]; */

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
      // Puedes aplicar los filtros a tu consulta de Mongoose
      const query: any = {};

      if (filters.ubicacion) {
        query["ubicacion"] = { $regex: filters.ubicacion, $options: "i" };
      }

      if (filters.tipo) {
        query["tipo"] = filters.tipo; 
      }

      if (filters.precio_por_hora) {
        query["precio_por_hora"] = { $lte: filters.precio_por_hora };
      }

      // Realiza la consulta
      return this.canchaModel.find(query);
    } catch (error) {
      throw new InternalServerErrorException("Error al pedir las canchas");
    }
  }
}
