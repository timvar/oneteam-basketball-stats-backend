import express from 'express';
import gameController from '../controllers/gameController';
import teamController from '../controllers/teamController';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/', async (_req, res) => {
  const games = await gameController.readAll();
  res.send(games);
});

router.post('/', async (req, res) => {
  const team = await teamController.readTeam({ teamId: req.body.teamId });
  const user = await userController.readUser({ userId: req.body.userId });
  const { homeTeam, awayTeam, gameNumber, description, gameDate } = req.body;

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
