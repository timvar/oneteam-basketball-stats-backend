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
const teamModel_1 = __importDefault(require("../models/teamModel"));
const playerModel_1 = __importDefault(require("../models/playerModel"));
const gameModel_1 = __importDefault(require("../models/gameModel"));
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
const readAll = ({ user }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield teamModel_1.default.find({ user });
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const readTeam = ({ team, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamData = yield teamModel_1.default.findById(team);
        if (lodash_isequal_1.default(teamData === null || teamData === void 0 ? void 0 : teamData.user, user)) {
            return teamData;
        }
        else {
            throw new Error('unauthorized user');
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const readPlayersByTeam = ({ team, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamData = yield teamModel_1.default.findById(team);
        if (lodash_isequal_1.default(teamData === null || teamData === void 0 ? void 0 : teamData.user, user)) {
            return yield playerModel_1.default.find({ team: teamData === null || teamData === void 0 ? void 0 : teamData._id });
        }
    }
    catch (error) {
        throw new Error('players not found');
    }
    return [];
});
const readGamesByTeam = ({ team, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teamData = yield teamModel_1.default.findById(team);
        if (lodash_isequal_1.default(teamData === null || teamData === void 0 ? void 0 : teamData.user, user)) {
            return yield gameModel_1.default.find({ team: teamData === null || teamData === void 0 ? void 0 : teamData._id });
        }
    }
    catch (error) {
        throw new Error('games not found');
    }
    return [];
});
const createTeam = ({ teamName, user, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamModel_1.default.create({
        teamName,
        user,
    });
});
const updateTeam = ({ team, teamName, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamModel_1.default.findByIdAndUpdate(team, { teamName }, { new: true });
});
const deleteTeam = ({ team }) => __awaiter(void 0, void 0, void 0, function* () {
    yield teamModel_1.default.findByIdAndRemove(team);
});
exports.default = {
    createTeam,
    readAll,
    readTeam,
    readPlayersByTeam,
    readGamesByTeam,
    updateTeam,
    deleteTeam,
};
