import { CanchaEstado, Deporte } from "../enums/enums";
export declare class AddressDto {
    streetName: string;
    streetNumber: number;
}
export declare class CreateCanchaDto {
    name: string;
    location: string;
    type: Deporte;
    price_per_hour: number;
    opening_hours: string;
    closing_time: string;
    state: CanchaEstado;
    images?: string[];
    address: AddressDto;
}
