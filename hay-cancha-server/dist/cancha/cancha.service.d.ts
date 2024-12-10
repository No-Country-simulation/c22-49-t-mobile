import { Model } from "mongoose";
import { CreateCanchaDto } from "./dto/CreateCancha.dto";
import { Cancha } from "./schemas/cancha.schema";
interface CanchaFilters {
    ubicacion?: string;
    tipo?: string;
    precio_por_hora?: number;
}
export declare class CanchaService {
    private canchaModel;
    constructor(canchaModel: Model<Cancha>);
    create(createCancha: CreateCanchaDto): Promise<Cancha>;
    findAll(filters: CanchaFilters): Promise<Cancha[]>;
}
export {};
