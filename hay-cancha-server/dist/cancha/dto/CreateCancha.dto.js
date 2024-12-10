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
exports.CreateCanchaDto = exports.AddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../enums/enums");
const class_transformer_1 = require("class-transformer");
class AddressDto {
}
exports.AddressDto = AddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nombre de la calle",
        example: "Av. Siempre Viva",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddressDto.prototype, "streetName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Altura de la calle",
        example: 123,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddressDto.prototype, "streetNumber", void 0);
class CreateCanchaDto {
}
exports.CreateCanchaDto = CreateCanchaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nombre de la cancha",
        example: "Futbol",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Ubicación de la cancha",
        example: "Palermo",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Tipo de cancha",
        example: enums_1.Deporte.FULTOL,
        enum: enums_1.Deporte,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Deporte),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Precio por hora de uso de la cancha",
        example: 20000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateCanchaDto.prototype, "price_per_hour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Horario de apertura de la cancha (formato HH:mm)",
        example: "08:00",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "opening_hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Horario de cierre de la cancha (formato HH:mm)",
        example: "22:00",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCanchaDto.prototype, "closing_time", void 0);
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
], CreateCanchaDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "URLs de las imágenes de la cancha",
        example: [
            "https://www.generallavalle.gob.ar/fotos/noticias/futbol-protocolo-deportes-49.jpg",
            "https://www.generallavalle.gob.ar/fotos/noticias/futbol-protocolo-deportes-49.jpg",
        ],
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    __metadata("design:type", Array)
], CreateCanchaDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Dirección de la cancha",
        type: AddressDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AddressDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", AddressDto)
], CreateCanchaDto.prototype, "address", void 0);
//# sourceMappingURL=CreateCancha.dto.js.map