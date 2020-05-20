import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import playerRouter from './routes/player.routes';
import pingRouter from './routes/ping.routes';
import connect from './connect';

declare let process: {
  env: {
    PORT: number;
    MONGODB_URI: string;
  };
};

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);
morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

app.use('/api/ping', pingRouter);
app.use('/api/players', playerRouter);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const url = process.env.MONGODB_URI;
connect({ url });
