"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanchaModule = void 0;
const common_1 = require("@nestjs/common");
const cancha_controller_1 = require("./cancha.controller");
const cancha_service_1 = require("./cancha.service");
const mongoose_1 = require("@nestjs/mongoose");
const cancha_schema_1 = require("./schemas/cancha.schema");
let CanchaModule = class CanchaModule {
};
exports.CanchaModule = CanchaModule;
exports.CanchaModule = CanchaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cancha_schema_1.Cancha.name, schema: cancha_schema_1.CanchaSchema }]),
        ],
        controllers: [cancha_controller_1.CanchaController],
        providers: [cancha_service_1.CanchaService],
    })
], CanchaModule);
//# sourceMappingURL=cancha.module.js.map