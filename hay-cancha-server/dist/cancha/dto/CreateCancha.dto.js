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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCanchaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../enums/enums");
class CreateCanchaDto {
}
exports.CreateCanchaDto = CreateCanchaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nombre de la cancha",
        example: "Cancha Principal",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Ubicación de la cancha",
        example: "Av. Siempre Viva 123",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Tipo de cancha",
        example: enums_1.Deporte.FULTOL,
        enum: enums_1.Deporte,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Deporte),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Precio por hora de uso de la cancha",
        example: 120.5,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateCanchaDto.prototype, "precio_por_hora", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Horario de apertura de la cancha (formato HH:mm)",
        example: "08:00",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "horario_apertura", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Horario de cierre de la cancha (formato HH:mm)",
        example: "22:00",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "horario_cierre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Estado actual de la cancha",
        example: enums_1.CanchaEstado.DISPONIBLE,
        enum: enums_1.CanchaEstado,
        default: enums_1.CanchaEstado.DISPONIBLE,
    }),
    (0, class_validator_1.IsEnum)(enums_1.CanchaEstado),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "URL de la imagen de la cancha",
        example: "https://example.com/cancha.jpg",
        required: false,
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "imagen", void 0);
//# sourceMappingURL=CreateCancha.dto.js.map