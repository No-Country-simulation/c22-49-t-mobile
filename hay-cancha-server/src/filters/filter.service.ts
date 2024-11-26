import { Injectable } from '@nestjs/common';
import { db } from '../firebase';
import { DocumentData, Query } from 'firebase-admin/firestore';


@Injectable()
export class FilterService {
  async getFilters(filters: any): Promise<any[]> {
    const mockData = [
      { location: 'Recoleta', price: 20000, name: 'Cancha 1', players: '5' },
      { location: 'Palermo', price: 25000, name: 'Cancha 2', players: '7' },
    ];

    return mockData.filter(
      (cancha) =>
        (!filters.location || cancha.location === filters.location) &&
        (!filters.price || cancha.price <= Number(filters.price)) &&
        (!filters.players || cancha.players === filters.players),
    );
  }
}



//ESTE CODIGO LO USARE CON FIREBASE MAS ADELANTE
// @Injectable()
// export class FilterService {
//   async getFilters(filters: any): Promise<DocumentData[]> {
//     let query: Query<DocumentData> = db.collection('canchas');

//     if (filters.location) {
//       query = query.where('location', '==', filters.location);
//     }

//     if (filters.price) {
//       query = query.where('price', '<=', Number(filters.price));
//     }

//     const snapshot = await query.get();
//     snapshot.docs.forEach(doc => {
//     });
    
//     return snapshot.docs.map((doc) => doc.data());
//   }
// }




// import { Injectable } from '@nestjs/common';
// import { db } from '../firebase';
// import { DocumentData, Query } from 'firebase-admin/firestore';

// @Injectable()
// export class FilterService {
//   async getFilters(filters: any): Promise<DocumentData[]> {
//     let query: Query<DocumentData> = db.collection('canchas');

//     console.log('Initial query:', query);

//     if (filters.location) {
//       query = query.where('location', '==', filters.location);
//     }

//     if (filters.price) {
//       query = query.where('price', '<=', parseInt(filters.price));
//     }

//     if (filters.players) {
//       query = query.where('players', '==', filters.players);
//     }

//     const snapshot = await query.get();
//     console.log('Snapshot size:', snapshot.size);
// console.log('Documents:', snapshot.docs.map((doc) => doc.data()));

//     return snapshot.docs.map((doc) => doc.data());
//   }
// }
