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
  const { playerName, playerNumber, team } = req.body;
  try {
    const user = await getUser(req);
    const selectedTeam = await teamController.readTeam({
      team,
      user: user?._id,
    });
    if (user && selectedTeam) {
      const player = await playerController.createPlayer({
        playerName,
        playerNumber,
        team: selectedTeam._id,
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
  const { playerName, playerNumber, team } = req.body;
  const selectedTeam = await teamController.readTeam(team);
  const player = await playerController.updatePlayer({
    playerId: req.params.id,
    playerName,
    playerNumber,
    team: selectedTeam?._id,
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
