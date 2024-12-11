import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('canchas')
export class Cancha {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column('float')
  price: number;
}
