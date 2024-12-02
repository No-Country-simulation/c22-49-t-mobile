"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaEstado = exports.CanchaEstado = exports.CanchaTipo = void 0;
var CanchaTipo;
(function (CanchaTipo) {
    CanchaTipo["CINCO"] = "5v5";
    CanchaTipo["SIETE"] = "7v7";
    CanchaTipo["ONCE"] = "11v11";
})(CanchaTipo || (exports.CanchaTipo = CanchaTipo = {}));
var CanchaEstado;
(function (CanchaEstado) {
    CanchaEstado["DISPONIBLE"] = "disponible";
    CanchaEstado["MANTENIMIENTO"] = "en mantenimiento";
})(CanchaEstado || (exports.CanchaEstado = CanchaEstado = {}));
var ReservaEstado;
(function (ReservaEstado) {
    ReservaEstado["PENDIENTE"] = "pendiente";
    ReservaEstado["CONFIRMADA"] = "confirmada";
    ReservaEstado["CANCELADA"] = "cancelada";
})(ReservaEstado || (exports.ReservaEstado = ReservaEstado = {}));
//# sourceMappingURL=enums.js.map