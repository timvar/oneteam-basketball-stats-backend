import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/', async (_req, res) => {
  const users = await userController.readAll();
  res.send(users);
});

router.post('/', async (req, res) => {
  const user = await userController.createUser({
    userName: req.body.userName,
    password: req.body.password,
  });

  return res.send(user);
});

router.put('/:id', async (req, res) => {
  const user = await userController.updateUserName({
    userId: req.params.id,
    userName: req.body.userName,
  });

  return res.send(user);
});

router.delete('/:id', (req, res) => {
  try {
    userController.deleteUser({ userId: req.params.id });
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

export default router;
