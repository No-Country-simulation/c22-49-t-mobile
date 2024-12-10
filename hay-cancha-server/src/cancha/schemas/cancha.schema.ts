import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CanchaEstado, Deporte } from "../enums/enums";

export type CanchaDocument = Cancha & Document;

@Schema({ timestamps: false })
export class Address {
  @Prop({ required: true })
  streetName: string;

  @Prop({ required: true })
  streetNumber: number;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class Cancha {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, enum: Deporte })
  type: Deporte;

  @Prop({ required: true })
  price_per_hour: number;

  @Prop({ required: true })
  opening_hours: string;

  @Prop({ required: true })
  closing_time: string;

  @Prop({
    required: true,
    enum: CanchaEstado,
    default: CanchaEstado.DISPONIBLE,
  })
  state: CanchaEstado;

  @Prop({ required: false, type: [String] })
  images?: string[];

  @Prop({ required: true, type: AddressSchema })
  address: Address;
}

export const CanchaSchema = SchemaFactory.createForClass(Cancha);
