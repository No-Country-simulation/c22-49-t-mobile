import { Document } from "mongoose";
import { CanchaEstado, Deporte } from "../enums/enums";
export type CanchaDocument = Cancha & Document;
export declare class Address {
    streetName: string;
    streetNumber: number;
}
export declare const AddressSchema: import("mongoose").Schema<Address, import("mongoose").Model<Address, any, any, any, Document<unknown, any, Address> & Address & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Address, Document<unknown, {}, import("mongoose").FlatRecord<Address>> & import("mongoose").FlatRecord<Address> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Cancha {
    name: string;
    location: string;
    type: Deporte;
    price_per_hour: number;
    opening_hours: string;
    closing_time: string;
    state: CanchaEstado;
    images?: string[];
    address: Address;
}
export declare const CanchaSchema: import("mongoose").Schema<Cancha, import("mongoose").Model<Cancha, any, any, any, Document<unknown, any, Cancha> & Cancha & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cancha, Document<unknown, {}, import("mongoose").FlatRecord<Cancha>> & import("mongoose").FlatRecord<Cancha> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
