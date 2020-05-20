import express from 'express';
import statController from '../controllers/statController';

const router = express.Router();

interface NewStat {
  playerNumber: number;
  onePm: number;
  twoPm: number;
  threePm: number;
  onePa: number;
  twoPa: number;
  threePa: number;
  orb: number;
  to: number;
  drb: number;
  ast: number;
  blk: number;
  stl: number;
}

interface UpdatedStat {
  statId: string;
  playerNumber: number;
  onePm: number;
  twoPm: number;
  threePm: number;
  onePa: number;
  twoPa: number;
  threePa: number;
  orb: number;
  to: number;
  drb: number;
  ast: number;
  blk: number;
  stl: number;
}

router.get('/', async (_req, res) => {
  const stats = await statController.readAll();
  res.send(stats);
});

router.post('/', async (req, res) => {
  const {
    playerNumber,
    onePm,
    twoPm,
    threePm,
    onePa,
    twoPa,
    threePa,
    orb,
    to,
    drb,
    ast,
    blk,
    stl,
  } = req.body;

  const newStat: NewStat = {
    playerNumber,
    onePm,
    twoPm,
    threePm,
    onePa,
    twoPa,
    threePa,
    orb,
    to,
    drb,
    ast,
    blk,
    stl,
  };

  const stat = await statController.createStat(newStat);
  return res.send(stat);
});

router.put('/:id', async (req, res) => {

  const {
    playerNumber,
    onePm,
    twoPm,
    threePm,
    onePa,
    twoPa,
    threePa,
    orb,
    to,
    drb,
    ast,
    blk,
    stl,
  } = req.body;

  const newStat: UpdatedStat = {
    statId: req.params.id,
    playerNumber,
    onePm,
    twoPm,
    threePm,
    onePa,
    twoPa,
    threePa,
    orb,
    to,
    drb,
    ast,
    blk,
    stl,
  };

  const stat = await statController.updateStat(newStat);
  return res.send(stat);
});

router.delete('/:id', (req, res) => {
  try {
    statController.deleteStat({ statId: req.params.id });
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

export default router;
