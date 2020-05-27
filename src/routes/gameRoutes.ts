import express from 'express';
import gameController from '../controllers/gameController';
import teamController from '../controllers/teamController';
import userController from '../controllers/userController';
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

router.post('/', async (req, res) => {
  const {
    homeTeam,
    awayTeam,
    gameNumber,
    description,
    gameDate,
    teamId,
  } = req.body;
  try {
    const user = await getUser(req);
    const team = await teamController.readTeam({ teamId, user: user?._id });
    if (user && team) {
      const game = await gameController.createGame({
        homeTeam,
        awayTeam,
        gameNumber,
        description,
        gameDate,
        user: user?._id,
        team: team?._id,
      });
      return res.send(game);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.put('/:id', async (req, res) => {
  const team = await teamController.readTeam(req.body.teamId);
  const user = await userController.readUser({ userId: req.body.userId });
  const { homeTeam, awayTeam, gameNumber, description, gameDate } = req.body;
  const game = await gameController.updateGame({
    gameId: req.params.id,
    homeTeam,
    awayTeam,
    gameNumber,
    description,
    gameDate,
    user: user?._id,
    team: team?._id,
  });

  return res.send(game);
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
