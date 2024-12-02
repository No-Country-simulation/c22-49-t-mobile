import { FilterService } from './filter.service';
export declare class FilterController {
    private readonly filterService;
    constructor(filterService: FilterService);
    getFilters(filters: any): {
        id: number;
        name: string;
        location: string;
        price: number;
        players: number;
    }[];
}
