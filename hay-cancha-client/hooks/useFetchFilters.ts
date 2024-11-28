import { useEffect, useState } from 'react';
import axios from 'axios';

interface FilterParams { 
    location?: string;
    price?: string;
    players?: string;
}

interface FilterResponse {
    location: string;
    price: string;
    name: string;
    players: string;
}

export default function useFetchFilters(params: {
    location: string;
    price: string;
    players: string;
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
            { name: 'Cancha 1', location: 'Recoleta', price: '20000', players: '5' },
            { name: 'Cancha 2', location: 'Palermo', price: '15000', players: '10' },
          ];
  
          // Filtrado de datos según parámetros
          const filteredData = data.filter((item) => {
            return (
              (params.location ? item.location === params.location : true) &&
              (params.players ? item.players === params.players : true)
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