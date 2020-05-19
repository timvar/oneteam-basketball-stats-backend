import express from 'express';
import cors from 'cors';

declare let process: {
  env: {
    PORT: number;
  };
};

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('client'));

app.get('/ping', (_req, res) => {
  console.log('someone pings');
  res.send('pong');
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
