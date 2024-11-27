import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterService {
    private canchas = [
        { id: 1, name: 'Cancha A', location: 'Santiago', price: 20, players: 5 },
        { id: 2, name: 'Cancha B', location: 'Valparaíso', price: 25, players: 7 },
      ];

      getFilters(filters: any) {
        return this.canchas.filter((cancha) => {
          return (
            (!filters.location || cancha.location.includes(filters.location)) &&
            (!filters.price || cancha.price <= filters.price) &&
            (!filters.players || cancha.players === filters.players)
          );
        });
      }
    }