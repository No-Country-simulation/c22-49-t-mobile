import { CanchaEstado, Deporte } from "../enums/enums";
export declare class CreateCanchaDto {
    nombre: string;
    ubicacion: string;
    tipo: Deporte;
    precio_por_hora: number;
    horario_apertura: string;
    horario_cierre: string;
    estado: CanchaEstado;
    imagen?: string;
}
