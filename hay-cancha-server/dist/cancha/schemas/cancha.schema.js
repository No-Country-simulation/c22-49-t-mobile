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
exports.CanchaSchema = exports.Cancha = exports.AddressSchema = exports.Address = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enums_1 = require("../enums/enums");
let Address = class Address {
};
exports.Address = Address;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Address.prototype, "streetName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Address.prototype, "streetNumber", void 0);
exports.Address = Address = __decorate([
    (0, mongoose_1.Schema)({ timestamps: false })
], Address);
exports.AddressSchema = mongoose_1.SchemaFactory.createForClass(Address);
let Cancha = class Cancha {
};
exports.Cancha = Cancha;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cancha.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cancha.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enums_1.Deporte }),
    __metadata("design:type", String)
], Cancha.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Cancha.prototype, "price_per_hour", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cancha.prototype, "opening_hours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Cancha.prototype, "closing_time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: enums_1.CanchaEstado,
        default: enums_1.CanchaEstado.DISPONIBLE,
    }),
    __metadata("design:type", String)
], Cancha.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], Cancha.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: exports.AddressSchema }),
    __metadata("design:type", Address)
], Cancha.prototype, "address", void 0);
exports.Cancha = Cancha = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Cancha);
exports.CanchaSchema = mongoose_1.SchemaFactory.createForClass(Cancha);
//# sourceMappingURL=cancha.schema.js.map