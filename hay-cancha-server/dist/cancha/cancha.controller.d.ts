import { CanchaService } from './cancha.service';
import { CreateCanchaDto } from './dto/CreateCancha.dto';
export declare class CanchaController {
    private readonly canchaService;
    constructor(canchaService: CanchaService);
    create(createCanchaDto: CreateCanchaDto): Promise<import("./schemas/cancha.schema").Cancha>;
    findAll(): Promise<import("./schemas/cancha.schema").Cancha[]>;
}
