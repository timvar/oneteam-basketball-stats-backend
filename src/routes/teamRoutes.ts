import express from 'express';
import teamController from '../controllers/teamController';
import { getUser } from '../utils/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) {
      const teams = await teamController.readAll({ user: user._id });
      return res.send(teams);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.get('/:id', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) {
      const team = await teamController.readTeam({
        user: user._id,
        team: req.params.id,
      });
      return res.send(team);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.get('/:id/games', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) {
      const games = await teamController.readGamesByTeam({
        user: user._id,
        team: req.params.id,
      });
      return res.send(games);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.get('/:id/players', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) {
      const players = await teamController.readPlayersByTeam({
        user: user._id,
        team: req.params.id,
      });
      return res.send(players);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.post('/', async (req, res) => {
  try {
    const user = await getUser(req);
    const { teamName } = req.body;
    if (user) {
      const team = await teamController.createTeam({
        teamName,
        user: user?._id,
      });
      return res.send(team);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

router.put('/:id', async (req, res) => {
  const team = await teamController.updateTeam({
    team: req.params.id,
    teamName: req.body.teamName,
  });
  return res.send(team);
});

router.delete('/:id', (req, res) => {
  try {
    teamController.deleteTeam({ team: req.params.id });
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

export default router;
