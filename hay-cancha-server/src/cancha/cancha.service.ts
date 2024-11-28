import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCanchaDto } from './dto/CreateCancha.dto';
import { Cancha } from './schemas/cancha.schema';

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
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findAll(): Promise<Cancha[]> {
    try {
      return this.canchaModel.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al pedir las canchas');
    }
  }

  /*   getFilters(filters: any) {
    return this.canchas.filter((cancha) => {
      return (
        (!filters.location || cancha.location.includes(filters.location)) &&
        (!filters.price || cancha.price <= filters.price) &&
        (!filters.players || cancha.players === filters.players)
      );
    });
  } */
}
