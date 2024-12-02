"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterService = void 0;
const common_1 = require("@nestjs/common");
let FilterService = class FilterService {
    constructor() {
        this.canchas = [
            { id: 1, name: 'Cancha A', location: 'Santiago', price: 20, players: 5 },
            { id: 2, name: 'Cancha B', location: 'Valparaíso', price: 25, players: 7 },
        ];
    }
    getFilters(filters) {
        return this.canchas.filter((cancha) => {
            return ((!filters.location || cancha.location.includes(filters.location)) &&
                (!filters.price || cancha.price <= filters.price) &&
                (!filters.players || cancha.players === filters.players));
        });
    }
};
exports.FilterService = FilterService;
exports.FilterService = FilterService = __decorate([
    (0, common_1.Injectable)()
], FilterService);
//# sourceMappingURL=filter.service.js.map