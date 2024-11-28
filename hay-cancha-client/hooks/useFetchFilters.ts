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

const useFetchFilters = (params: FilterParams) => {
    const [filters, setFilters] = useState<FilterResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilters = async () => {
          setLoading(true);
          setError(null);
    
          try {
            const response = await axios.get('http://localhost:3000/filters', {
              params,
            });
    
            setFilters(response.data);
          } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Error inesperado');
          } finally {
            setLoading(false);
          }
        };
    
        fetchFilters();
      }, [params]);
    
    return { filters, loading, error };
}

export default useFetchFilters;