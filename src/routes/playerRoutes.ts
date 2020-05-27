import express from 'express';
import playerController from '../controllers/playerController';
import teamController from '../controllers/teamController';
import { getUser } from '../utils/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) {
      const players = await playerController.readAll({ user: user._id });
      return res.send(players);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.post('/', async (req, res) => {
  const { playerName, playerNumber, teamId } = req.body;
  try {
    const user = await getUser(req);
    const team = await teamController.readTeam({ teamId, user: user?._id });
    if (user && team) {
      const player = await playerController.createPlayer({
        playerName,
        playerNumber,
        team: team._id,
        user: user._id,
      });
      return res.send(player);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.put('/:id', async (req, res) => {
  const team = await teamController.readTeam(req.body.teamId);
  const player = await playerController.updatePlayer({
    playerId: req.params.id,
    playerName: req.body.playerName,
    playerNumber: req.body.playerNumber,
    team: team?._id,
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
