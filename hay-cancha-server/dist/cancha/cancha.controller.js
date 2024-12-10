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
exports.CanchaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cancha_service_1 = require("./cancha.service");
const CreateCancha_dto_1 = require("./dto/CreateCancha.dto");
const CanchaFilters_dto_1 = require("./dto/CanchaFilters.dto");
let CanchaController = class CanchaController {
    constructor(canchaService) {
        this.canchaService = canchaService;
    }
    async create(createCanchaDto) {
        return this.canchaService.create(createCanchaDto);
    }
    async findAll(filters) {
        return this.canchaService.findAll(filters);
    }
};
exports.CanchaController = CanchaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCancha_dto_1.CreateCanchaDto]),
    __metadata("design:returntype", Promise)
], CanchaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CanchaFilters_dto_1.CanchaFiltersDto]),
    __metadata("design:returntype", Promise)
], CanchaController.prototype, "findAll", null);
exports.CanchaController = CanchaController = __decorate([
    (0, swagger_1.ApiTags)("Cancha"),
    (0, common_1.Controller)("cancha"),
    __metadata("design:paramtypes", [cancha_service_1.CanchaService])
], CanchaController);
//# sourceMappingURL=cancha.controller.js.map