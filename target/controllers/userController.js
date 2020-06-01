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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const readAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.find({});
});
const readUser = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findById(userId);
});
const readUserByName = ({ userName, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findOne({ userName });
});
const createUser = ({ userName, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    return yield userModel_1.default.create({
        userName,
        passwordHash,
    });
});
const updateUserName = ({ userId, userName, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.findByIdAndUpdate(userId, { userName }, { new: true });
});
const deleteUser = ({ userId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.findByIdAndRemove(userId);
});
exports.default = {
    createUser,
    readAll,
    readUser,
    readUserByName,
    updateUserName,
    deleteUser,
};
