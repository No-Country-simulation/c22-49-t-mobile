import { CanchaService } from "./cancha.service";
import { CreateCanchaDto } from "./dto/CreateCancha.dto";
import { CanchaFiltersDto } from "./dto/CanchaFilters.dto";
export declare class CanchaController {
    private readonly canchaService;
    constructor(canchaService: CanchaService);
    create(createCanchaDto: CreateCanchaDto): Promise<import("./schemas/cancha.schema").Cancha>;
    findAll(filters: CanchaFiltersDto): Promise<import("./schemas/cancha.schema").Cancha[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/cancha.schema").Cancha> & import("./schemas/cancha.schema").Cancha & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
