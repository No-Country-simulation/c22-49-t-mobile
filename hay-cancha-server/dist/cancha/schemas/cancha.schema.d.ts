import { Document } from "mongoose";
import { CanchaEstado, Deporte } from "../enums/enums";
export type CanchaDocument = Cancha & Document;
export declare class Cancha {
    nombre: string;
    ubicación: string;
    tipo: Deporte;
    precio_por_hora: number;
    horario_apertura: string;
    horario_cierre: string;
    estado: CanchaEstado;
    imagen?: string;
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
