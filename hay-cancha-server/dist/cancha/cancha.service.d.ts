import { Model } from 'mongoose';
import { CreateCanchaDto } from './dto/CreateCancha.dto';
import { Cancha } from './schemas/cancha.schema';
export declare class CanchaService {
    private canchaModel;
    constructor(canchaModel: Model<Cancha>);
    create(createCancha: CreateCanchaDto): Promise<Cancha>;
    findAll(): Promise<Cancha[]>;
}
