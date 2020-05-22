import express from 'express';
import teamController from '../controllers/teamController';

const router = express.Router();

router.get('/', async (_req, res) => {
  const teams = await teamController.readAll();
  res.send(teams);
});

router.get('/:id', async (req, res) => {
  const team = await teamController.readTeam({teamId: req.params.id});
  res.send(team);
});


router.get('/:id/players', async (req, res) => {
  try {
    const team = await teamController.readPlayersByTeam({teamId: req.params.id});
    res.send(team);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

router.post('/', async (req, res) => {
  const team = await teamController.createTeam({
    teamName: req.body.teamName,
  });
  return res.send(team);
});

router.put('/:id', async (req, res) => {
  const team = await teamController.updateTeam({
    teamId: req.params.id,
    teamName: req.body.teamName,
  });
  return res.send(team);
});

router.delete('/:id', (req, res) => {
  try {
    teamController.deleteTeam({ teamId: req.params.id });
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

export default router;
