import express from 'express';
import playerController from '../controllers/playerController';
import teamController from '../controllers/teamController';

const router = express.Router();

router.get('/', async (_req, res) => {
  const players = await playerController.readAll();
  res.send(players);
});

router.post('/', async (req, res) => {
  const team = await teamController.readTeam({teamId: req.body.teamId});
  
  const player = await playerController.createPlayer({
    playerName: req.body.playerName,
    playerNumber: req.body.playerNumber,
    team: team?._id
  });
  
  return res.send(player);
});

router.put('/:id', async (req, res) => {
  const team = await teamController.readTeam(req.body.teamId);
  const player = await playerController.updatePlayer({
    playerId: req.params.id,
    playerName: req.body.playerName,
    playerNumber: req.body.playerNumber,
    team: team?._id
  });

  return res.send(player);
});

router.delete('/:id', (req, res) => {
  try {
    playerController.deletePlayer({ playerId: req.params.id });
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

export default router;
