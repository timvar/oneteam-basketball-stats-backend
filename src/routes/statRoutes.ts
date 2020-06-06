import express from 'express';
import statController from '../controllers/statController';
import gameController from '../controllers/gameController';
import { getUser } from '../utils/auth';

const router = express.Router();

// TODO ADD USER AUTH CHECK
router.get('/', async (req, res) => {
  try {
    const user = await getUser(req);
    if (user) {
      const stats = await statController.readAll();
      res.send(stats);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
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
    game,
  } = req.body;

  try {
    const user = await getUser(req);
    const gameData = await gameController.readGame({ game, user: user?._id });
    if (user && gameData) {
      const stat = await statController.createStat({
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
        user: user._id,
        game: gameData._id,
      });
      return res.send(stat);
    }
  } catch (error) {
    return res.status(401).json({ error: 'missing or invalid token' });
  }
  return res.status(401).json({ error: 'missing user' });
});

export default router;
