"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaEstado = exports.CanchaEstado = exports.Deporte = void 0;
var Deporte;
(function (Deporte) {
    Deporte["FULTOL"] = "F\u00FAtbol";
    Deporte["BASQUETBOL"] = "B\u00E1squetbol";
    Deporte["TENIS"] = "Tenis";
    Deporte["PADEL"] = "P\u00E1del";
    Deporte["VOLEIBOL"] = "V\u00F3leibol";
})(Deporte || (exports.Deporte = Deporte = {}));
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