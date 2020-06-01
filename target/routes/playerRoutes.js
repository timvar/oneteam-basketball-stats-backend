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
const playerController_1 = __importDefault(require("../controllers/playerController"));
const teamController_1 = __importDefault(require("../controllers/teamController"));
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.getUser(req);
        if (user) {
            const players = yield playerController_1.default.readAll({ user: user._id });
            return res.send(players);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { playerName, playerNumber, teamId } = req.body;
    const { playerName, playerNumber } = req.body;
    try {
        const user = yield auth_1.getUser(req);
        console.log('user', user);
        // const team = await teamController.readTeam({ teamId, user: user?._id });
        // if (user && team) {
        if (user) {
            const player = yield playerController_1.default.createPlayer({
                playerName,
                playerNumber,
                //  team: team._id,
                user: user._id,
            });
            console.log(player);
            return res.send(player);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield teamController_1.default.readTeam(req.body.teamId);
    const player = yield playerController_1.default.updatePlayer({
        playerId: req.params.id,
        playerName: req.body.playerName,
        playerNumber: req.body.playerNumber,
        team: team === null || team === void 0 ? void 0 : team._id,
    });
    return res.send(player);
}));
router.delete('/:id', (req, res) => {
    try {
        playerController_1.default.deletePlayer({ playerId: req.params.id });
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = router;
