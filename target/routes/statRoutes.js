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
const statController_1 = __importDefault(require("../controllers/statController"));
const gameController_1 = __importDefault(require("../controllers/gameController"));
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
// TODO ADD USER AUTH CHECK
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.getUser(req);
        if (user) {
            const stats = yield statController_1.default.readAll();
            res.send(stats);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerNumber, onePm, twoPm, threePm, onePa, twoPa, threePa, orb, to, drb, ast, blk, stl, game, } = req.body;
    try {
        const user = yield auth_1.getUser(req);
        const gameData = yield gameController_1.default.readGame({ game, user: user === null || user === void 0 ? void 0 : user._id });
        if (user && gameData) {
            const stat = yield statController_1.default.createStat({
                playerNumber,
                onePm,
                twoPm,
                threePm,
                onePa,
                twoPa,
                threePa,
                orb,
                to,
                drb,
                ast,
                blk,
                stl,
                user: user._id,
                game: gameData._id,
            });
            return res.send(stat);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
exports.default = router;
