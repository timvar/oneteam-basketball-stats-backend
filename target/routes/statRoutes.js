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
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield statController_1.default.readAll();
    res.send(stats);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerNumber, onePm, twoPm, threePm, onePa, twoPa, threePa, orb, to, drb, ast, blk, stl, } = req.body;
    const newStat = {
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
    };
    const stat = yield statController_1.default.createStat(newStat);
    return res.send(stat);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playerNumber, onePm, twoPm, threePm, onePa, twoPa, threePa, orb, to, drb, ast, blk, stl, } = req.body;
    const newStat = {
        statId: req.params.id,
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
    };
    const stat = yield statController_1.default.updateStat(newStat);
    return res.send(stat);
}));
router.delete('/:id', (req, res) => {
    try {
        statController_1.default.deleteStat({ statId: req.params.id });
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = router;
