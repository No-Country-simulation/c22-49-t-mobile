import { useEffect, useState } from 'react';
import axios from 'axios';

interface FilterParams { 
    location?: string;
    price?: string;
    players?: string;
    sport?: string;
}

interface FilterResponse {
    location: string;
    price: string;
    name: string;
    players: string;
    sport: string;
}

export default function useFetchFilters(params: {
    location: string;
    price: string;
    players: string;
    sport: string;
  }) {
    const [filters, setFilters] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
  
        try {
          // Simulación de datos de API
          const data = [
            { name: 'Cancha 1', location: 'Recoleta', price: '20000', players: '14', sport: 'Futbol', image: require('../assets/images/slider-fields/futbol2.png') },
            { name: 'Cancha 2', location: 'Recoleta', price: '20000', players: '4', sport: 'Pádel', image: require('../assets/images/slider-fields/padel.png') },
            { name: 'Cancha 3', location: 'Palermo', price: '25000', players: '10', sport: 'Basquetbol', image: require('../assets/images/slider-fields/basquetbol2.png') },
            { name: 'Cancha 4', location: 'Palermo', price: '25000', players: '12', sport: 'Futbol', image: require('../assets/images/slider-fields/futbol3.png') },
            { name: 'Cancha 5', location: 'Belgrano', price: '23000', players: '14', sport: 'Futbol', image: require('../assets/images/slider-fields/futbol.png') },
            { name: 'Cancha 6', location: 'Belgrano', price: '23000', players: '4', sport: 'Pádel', image: require('../assets/images/slider-fields/padel.png') },
            { name: 'Cancha 7', location: 'Belgrano', price: '20000', players: '10', sport: 'Basquetbol', image: require('../assets/images/slider-fields/basquetbol1.png') },
            { name: 'Cancha 8', location: 'Agronomía', price: '15000', players: '10', sport: 'Basquetbol', image: require('../assets/images/slider-fields/basquetbol3.png') },
            { name: 'Cancha 9', location: 'Agronomía', price: '15000', players: '14', sport: 'Futbol', image: require('../assets/images/slider-fields/futbol4.png') },
            { name: 'Cancha 10', location: 'Agronomía', price: '15000', players: '4', sport: 'Tenis', image: require('../assets/images/slider-fields/tenis.png') },
            { name: 'Cancha 11', location: 'Barracas', price: '15000', players: '10', sport: 'Basquetbol', image: require('../assets/images/slider-fields/basquetbol.png') },
            { name: 'Cancha 12', location: 'Barracas', price: '20000', players: '14', sport: 'Futbol', image: require('../assets/images/slider-fields/futbol5.png') },
            { name: 'Cancha 13', location: 'Barracas', price: '25000', players: '4', sport: 'Tenis', image: require('../assets/images/slider-fields/tenis2.png') },
          ];
  
          // Filtrado de datos según parámetros
          const filteredData = data.filter((item) => {
            return (
              (params.location ? item.location === params.location : true) &&
              (params.players ? item.players === params.players : true) &&
              (params.price ? item.price <= params.price : true) &&
              (params.sport ? item.sport === params.sport : true)
            );
          });
  
          setFilters(filteredData);
        } catch (e) {
          setError('Error al cargar los datos');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [params]);
  
    return { filters, loading, error };
  }
  

// const useFetchFilters = (params: FilterParams) => {
//     const [filters, setFilters] = useState<FilterResponse[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchFilters = async () => {
//           setLoading(true);
//           setError(null);
    
//           try {
//             const response = await axios.get('http://localhost:3000/filters', {
//               params,
//             });
    
//             setFilters(response.data);
//           } catch (err: any) {
//             setError(err.response?.data?.message || err.message || 'Error inesperado');
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchFilters();
//       }, [params]);
    
//     return { filters, loading, error };
// }

// export default useFetchFilters;