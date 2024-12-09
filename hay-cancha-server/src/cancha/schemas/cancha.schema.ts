import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CanchaEstado, Deporte } from "../enums/enums";

export type CanchaDocument = Cancha & Document;

@Schema({ timestamps: true })
export class Cancha {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  ubicación: string;

  @Prop({ required: true, enum: Deporte })
  tipo: Deporte;

  @Prop({ required: true })
  precio_por_hora: number;

  @Prop({ required: true })
  horario_apertura: string;

  @Prop({ required: true })
  horario_cierre: string;

  @Prop({
    required: true,
    enum: CanchaEstado,
    default: CanchaEstado.DISPONIBLE,
  })
  estado: CanchaEstado;

  @Prop({ required: false })
  imagen?: string;
}

export const CanchaSchema = SchemaFactory.createForClass(Cancha);
