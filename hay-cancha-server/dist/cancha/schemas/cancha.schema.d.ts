import { Document } from 'mongoose';
import { CanchaEstado, CanchaTipo } from '../enums/enums';
export type CanchaDocument = Cancha & Document;
export declare class Cancha {
    nombre: string;
    ubicación: string;
    tipo: CanchaTipo;
    precio_por_hora: number;
    horario_apertura: string;
    horario_cierre: string;
    estado: CanchaEstado;
    imagen?: string;
}
export declare const CanchaSchema: any;
