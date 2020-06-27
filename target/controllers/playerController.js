"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playerModel_1 = __importDefault(require("../models/playerModel"));
const readAll = ({ user }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield playerModel_1.default.find({ user });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const createPlayer = ({ playerName, playerNumber, team, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield playerModel_1.default.create({
            playerName,
            playerNumber,
            team,
            user,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const updatePlayer = ({ playerId, playerName, playerNumber, team, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield playerModel_1.default.findByIdAndUpdate(playerId, { playerName, playerNumber, team }, { new: true });
});
const deletePlayer = ({ playerId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield playerModel_1.default.findByIdAndRemove(playerId);
});
exports.default = {
    createPlayer,
    readAll,
    updatePlayer,
    deletePlayer,
};
