"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanchaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cancha_schema_1 = require("./schemas/cancha.schema");
let CanchaService = class CanchaService {
    constructor(canchaModel) {
        this.canchaModel = canchaModel;
    }
    async create(createCancha) {
        try {
            const newCancha = await this.canchaModel.create(createCancha);
            return newCancha;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Error al crear el producto");
        }
    }
    async findAll(filters) {
        console.log(filters);
        try {
            const query = {};
            if (filters.location) {
                query["location"] = { $regex: filters.location, $options: "i" };
            }
            if (filters.type) {
                query["type"] = filters.type;
            }
            console.log(filters);
            if (filters.price_per_hour) {
                query["price_per_hour"] = { $lte: filters.price_per_hour };
            }
            return this.canchaModel.find(query);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Error al pedir las canchas");
        }
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('ID de cancha inválido');
        }
        try {
            const cancha = await this.canchaModel.findById(id);
            return cancha;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Error al buscar la cancha de id: ${id}`);
        }
    }
};
exports.CanchaService = CanchaService;
exports.CanchaService = CanchaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cancha_schema_1.Cancha.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CanchaService);
//# sourceMappingURL=cancha.service.js.map