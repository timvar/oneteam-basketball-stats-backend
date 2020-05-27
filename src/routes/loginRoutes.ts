import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userController from '../controllers/userController';

declare let process: {
  env: {
    SECRET: string;
  };
};

const router = express.Router();

router.post('/', async (req, res) => {
  const { userName, password } = req.body;
  const user = await userController.readUserByName({ userName });
  const passwordValid =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordValid)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: user.userName,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return res.status(200).send({ token, userName: user.userName });
});

export default router;
