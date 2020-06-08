import express from 'express';
import gameController from '../controllers/gameController';
import teamController from '../controllers/teamController';
import { getUser } from '../utils/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) {
      const games = await gameController.readAll({ user: user._id });
      return res.send(games);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.get('/:id/stats', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) {
      const stats = await gameController.readStatsByGame({
        game: req.params.id,
        user: user._id,
      });
      return res.send(stats);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.post('/', async (req, res) => {
  const {
    homeTeam,
    awayTeam,
    gameNumber,
    description,
    gameDate,
    team,
  } = req.body;
  try {
    const user = await getUser(req);
    const teamData = await teamController.readTeam({ team, user: user?._id });
    if (user && teamData) {
      const game = await gameController.createGame({
        homeTeam,
        awayTeam,
        gameNumber,
        description,
        gameDate,
        user: user?._id,
        team: teamData?._id,
      });
      return res.send(game);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.put('/:id', async (req, res) => {
  const {
    homeTeam,
    awayTeam,
    gameNumber,
    description,
    gameDate,
    team,
  } = req.body;
  try {
    const user = await getUser(req);
    const teamData = await teamController.readTeam(team);
    if (user && teamData) {
      const game = await gameController.updateGame({
        gameId: req.params.id,
        homeTeam,
        awayTeam,
        gameNumber,
        description,
        gameDate,
        user: user?._id,
        team: teamData?._id,
      });
      return res.send(game);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.delete('/:id', (req, res) => {
  try {
    gameController.deleteGame({ gameId: req.params.id });
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

export default router;
