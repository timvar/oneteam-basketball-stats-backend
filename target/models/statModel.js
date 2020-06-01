"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const statSchema = new mongoose_1.Schema({
    playerNumber: { type: Number },
    onePm: { type: Number },
    twoPm: { type: Number },
    threePm: { type: Number },
    onePa: { type: Number },
    twoPa: { type: Number },
    threePa: { type: Number },
    orb: { type: Number },
    to: { type: Number },
    drb: { type: Number },
    ast: { type: Number },
    blk: { type: Number },
    stl: { type: Number },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    game: { type: mongoose_1.Schema.Types.ObjectId, required: true },
});
statSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model('Stat', statSchema);
