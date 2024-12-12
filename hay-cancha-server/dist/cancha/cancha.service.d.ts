import { Model, Types } from "mongoose";
import { CreateCanchaDto } from "./dto/CreateCancha.dto";
import { Cancha } from "./schemas/cancha.schema";
interface CanchaFilters {
    location?: string;
    type?: string;
    price_per_hour?: number;
}
export declare class CanchaService {
    private canchaModel;
    constructor(canchaModel: Model<Cancha>);
    create(createCancha: CreateCanchaDto): Promise<Cancha>;
    findAll(filters: CanchaFilters): Promise<Cancha[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Cancha> & Cancha & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
}
export {};
