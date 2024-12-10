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
exports.CanchaSchema = exports.Cancha = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enums_1 = require("../enums/enums");
let Cancha = class Cancha {
};
exports.Cancha = Cancha;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cancha.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cancha.prototype, "ubicaci\u00F3n", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enums_1.Deporte }),
    __metadata("design:type", String)
], Cancha.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Cancha.prototype, "precio_por_hora", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cancha.prototype, "horario_apertura", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cancha.prototype, "horario_cierre", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: enums_1.CanchaEstado,
        default: enums_1.CanchaEstado.DISPONIBLE,
    }),
    __metadata("design:type", String)
], Cancha.prototype, "estado", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Cancha.prototype, "imagen", void 0);
exports.Cancha = Cancha = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Cancha);
exports.CanchaSchema = mongoose_1.SchemaFactory.createForClass(Cancha);
//# sourceMappingURL=cancha.schema.js.map