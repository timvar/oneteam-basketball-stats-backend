import express from 'express';
import playerController from '../controllers/player.controller';

const router = express.Router();

router.get('/', async (_req, res) => {
  const players = await playerController.getAll();
  res.send(players);
});

router.post('/', async (req, res) => {
  const player = await playerController.createPlayer({
    playerName: req.body.playerName,
    playerNumber: req.body.playerNumber,
  });
  return res.send(player);
});

router.put('/:id', async (req, res) => {
  const player = await playerController.updatePlayer({
    playerId: req.params.id,
    playerName: req.body.playerName,
    playerNumber: req.body.playerNumber,
  });
  return res.send(player);
});

export default router;
