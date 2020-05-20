"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = ({ url }) => {
    const connect = () => {
        mongoose_1.default
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
            return console.info('Successfully connected to MongoDB');
        })
            .catch((error) => {
            console.error('Error connecting to database: ', error);
        });
    };
    connect();
    mongoose_1.default.connection.on('disconnected', connect);
};
