import bcrypt from 'bcrypt';
import User, { UserI } from '../models/userModel';

interface CreateUserInput {
  userName: UserI['userName'];
  password: UserI['password'];
}

interface FindUserInput {
  userId: UserI['id'];
}

interface UpdateUserNameInput {
  userId: UserI['id'];
  userName: UserI['userName'];
}

interface DeleteUserInput {
  userId: UserI['id'];
}

const readAll = async (): Promise<UserI[]> => {
  return await User.find({});
};

const readUser = async ({ userId }: FindUserInput): Promise<UserI | null> => {
  return await User.findById(userId);
};

const createUser = async ({
  userName,
  password,
}: CreateUserInput): Promise<UserI> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return await User.create({
    userName,
    passwordHash,
  });
};

const updateUserName = async ({
  userId,
  userName,
}: UpdateUserNameInput): Promise<UserI | null> => {
  return await User.findByIdAndUpdate(userId, { userName }, { new: true });
};

const deleteUser = async ({ userId }: DeleteUserInput) => {
  await User.findByIdAndRemove(userId);
};

export default {
  createUser,
  readAll,
  readUser,
  updateUserName,
  deleteUser,
};
