export declare class FilterService {
    private canchas;
    getFilters(filters: any): {
        id: number;
        name: string;
        location: string;
        price: number;
        players: number;
    }[];
}
