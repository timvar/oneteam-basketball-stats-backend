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
const express_1 = __importDefault(require("express"));
const gameController_1 = __importDefault(require("../controllers/gameController"));
const teamController_1 = __importDefault(require("../controllers/teamController"));
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.getUser(req);
        if (user) {
            const games = yield gameController_1.default.readAll({ user: user._id });
            return res.send(games);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.get('/:id/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.getUser(req);
        if (user) {
            const stats = yield gameController_1.default.readStatsByGame({
                game: req.params.id,
                user: user._id,
            });
            return res.send(stats);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { homeTeam, awayTeam, gameNumber, description, gameDate, team, } = req.body;
    try {
        const user = yield auth_1.getUser(req);
        const teamData = yield teamController_1.default.readTeam({ team, user: user === null || user === void 0 ? void 0 : user._id });
        if (user && teamData) {
            const game = yield gameController_1.default.createGame({
                homeTeam,
                awayTeam,
                gameNumber,
                description,
                gameDate,
                user: user === null || user === void 0 ? void 0 : user._id,
                team: teamData === null || teamData === void 0 ? void 0 : teamData._id,
            });
            return res.send(game);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { homeTeam, awayTeam, gameNumber, description, gameDate, team, } = req.body;
    try {
        const user = yield auth_1.getUser(req);
        const teamData = yield teamController_1.default.readTeam(team);
        if (user && teamData) {
            const game = yield gameController_1.default.updateGame({
                gameId: req.params.id,
                homeTeam,
                awayTeam,
                gameNumber,
                description,
                gameDate,
                user: user === null || user === void 0 ? void 0 : user._id,
                team: teamData === null || teamData === void 0 ? void 0 : teamData._id,
            });
            return res.send(game);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.delete('/:id', (req, res) => {
    try {
        gameController_1.default.deleteGame({ gameId: req.params.id });
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = router;
