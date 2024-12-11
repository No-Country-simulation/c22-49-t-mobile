import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from '../entities/cancha.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Cancha)
    private canchaRepository: Repository<Cancha>,
  ) {}

  async findAll(): Promise<Cancha[]> {
    return this.canchaRepository.find();
  }

  async findWithFilters(location?: string, maxPrice?: number, players?: number, sport?: string ): Promise<Cancha[]> {
    const query = this.canchaRepository.createQueryBuilder('cancha');
    
    if (location) {
      query.andWhere('cancha.location = :location', { location });
    }

    if (maxPrice) {
      query.andWhere('cancha.price <= :maxPrice', { maxPrice });
    }

    if (players) {
        query.andWhere('cancha.players = :players', { players });
        }

    if (sport) {
        query.andWhere('cancha.sport = :sport', { sport });
    }

    if (!location && !maxPrice && !players) {
      return this.findAll();
    }

    return query.getMany();
  }
}
