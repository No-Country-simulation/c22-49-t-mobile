import { CanchaEstado, CanchaTipo } from '../enums/enums';
export declare class CreateCanchaDto {
    nombre: string;
    ubicación: string;
    tipo: CanchaTipo;
    precio_por_hora: number;
    horario_apertura: string;
    horario_cierre: string;
    estado: CanchaEstado;
    imagen?: string;
}
