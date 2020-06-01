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
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userController_1.default.readAll();
    res.send(users);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userController_1.default.createUser({
        userName: req.body.userName,
        password: req.body.password,
    });
    return res.send(user);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userController_1.default.updateUserName({
        userId: req.params.id,
        userName: req.body.userName,
    });
    return res.send(user);
}));
router.delete('/:id', (req, res) => {
    try {
        userController_1.default.deleteUser({ userId: req.params.id });
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = router;
