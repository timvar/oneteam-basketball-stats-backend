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
const teamController_1 = __importDefault(require("../controllers/teamController"));
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.getUser(req);
        if (user) {
            const teams = yield teamController_1.default.readAll({ user: user._id });
            return res.send(teams);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.getUser(req);
        if (user) {
            const team = yield teamController_1.default.readTeam({
                user: user._id,
                teamId: req.params.id,
            });
            return res.send(team);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.get('/:id/players', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.getUser(req);
        if (user) {
            const players = yield teamController_1.default.readPlayersByTeam({
                user: user._id,
                teamId: req.params.id,
            });
            return res.send(players);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_1.getUser(req);
        const { teamName } = req.body;
        if (user) {
            const team = yield teamController_1.default.createTeam({
                teamName,
                user: user === null || user === void 0 ? void 0 : user._id,
            });
            return res.send(team);
        }
    }
    catch (error) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    return res.status(401).json({ error: 'missing user' });
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield teamController_1.default.updateTeam({
        teamId: req.params.id,
        teamName: req.body.teamName,
    });
    return res.send(team);
}));
router.delete('/:id', (req, res) => {
    try {
        teamController_1.default.deleteTeam({ teamId: req.params.id });
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = router;
