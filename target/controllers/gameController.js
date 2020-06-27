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
const gameModel_1 = __importDefault(require("../models/gameModel"));
const statModel_1 = __importDefault(require("../models/statModel"));
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
const readAll = ({ user }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield gameModel_1.default.find({ user });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const readStatsByGame = ({ game, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameData = yield gameModel_1.default.findById(game);
        if (lodash_isequal_1.default(gameData === null || gameData === void 0 ? void 0 : gameData.user, user)) {
            return yield statModel_1.default.find({ game: gameData === null || gameData === void 0 ? void 0 : gameData._id });
        }
    }
    catch (error) {
        throw new Error('stats not found');
    }
    return [];
});
const readGame = ({ game, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gameData = yield gameModel_1.default.findById(game);
        if (lodash_isequal_1.default(gameData === null || gameData === void 0 ? void 0 : gameData.user, user)) {
            return gameData;
        }
        else {
            throw new Error('unauthorized user');
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const createGame = ({ homeTeam, awayTeam, gameNumber, description, gameDate, user, team, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gameModel_1.default.create({
        homeTeam,
        awayTeam,
        gameNumber,
        description,
        gameDate,
        user,
        team,
    });
});
const updateGame = ({ gameId, homeTeam, awayTeam, gameNumber, gameDate, user, team, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gameModel_1.default.findByIdAndUpdate(gameId, { homeTeam, awayTeam, gameNumber, gameDate, user, team }, { new: true });
});
const deleteGame = ({ gameId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield gameModel_1.default.findByIdAndRemove(gameId);
});
exports.default = {
    createGame,
    readAll,
    readStatsByGame,
    readGame,
    updateGame,
    deleteGame,
};
