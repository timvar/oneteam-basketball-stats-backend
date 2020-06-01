"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const playerRoutes_1 = __importDefault(require("./routes/playerRoutes"));
const pingRoutes_1 = __importDefault(require("./routes/pingRoutes"));
const statRoutes_1 = __importDefault(require("./routes/statRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/teamRoutes"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const connect_1 = __importDefault(require("./connect"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.static('build'));
app.use(express_1.default.json());
app.use(morgan_1.default(':method :url :status :res[content-length] - :response-time ms :body'));
morgan_1.default.token('body', function (req) {
    return JSON.stringify(req.body);
});
app.use('/api/ping', pingRoutes_1.default);
app.use('/api/players', playerRoutes_1.default);
app.use('/api/stats', statRoutes_1.default);
app.use('/api/teams', teamRoutes_1.default);
app.use('/api/games', gameRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/login', loginRoutes_1.default);
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const url = process.env.MONGODB_URI;
connect_1.default({ url });
