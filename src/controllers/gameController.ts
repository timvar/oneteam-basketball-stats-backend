import Game, { GameI } from '../models/gameModel';
import { TeamI } from '../models/teamModel';
import { UserI } from '../models/userModel';

interface CreateGameInput {
  homeTeam: GameI['homeTeam'];
  awayTeam: GameI['awayTeam'];
  gameNumber: GameI['gameNumber'];
  description: GameI['description'];
  gameDate: GameI['gameDate'];
  user: UserI['_id'];
  team: TeamI['_id'];
}

interface FindGamesInput {
  user: UserI['_id'];
}

interface UpdateGameInput {
  gameId: GameI['id'];
  homeTeam: GameI['homeTeam'];
  awayTeam: GameI['awayTeam'];
  gameNumber: GameI['gameNumber'];
  description: GameI['description'];
  gameDate: GameI['gameDate'];
  user: UserI['_id'];
  team: TeamI['_id'];
}

interface DeleteGameInput {
  gameId: GameI['id'];
}

const readAll = async ({ user }: FindGamesInput): Promise<GameI[]> => {
  try {
    return await Game.find({ user });
  } catch (error) {
    throw new Error(error.message);
  }
};

const createGame = async ({
  homeTeam,
  awayTeam,
  gameNumber,
  description,
  gameDate,
  user,
  team,
}: CreateGameInput): Promise<GameI> => {
  return await Game.create({
    homeTeam,
    awayTeam,
    gameNumber,
    description,
    gameDate,
    user,
    team,
  });
};

const updateGame = async ({
  gameId,
  homeTeam,
  awayTeam,
  gameNumber,
  gameDate,
  user,
  team,
}: UpdateGameInput): Promise<GameI | null> => {
  return await Game.findByIdAndUpdate(
    gameId,
    { homeTeam, awayTeam, gameNumber, gameDate, user, team },
    { new: true }
  );
};

const deleteGame = async ({ gameId }: DeleteGameInput) => {
  await Game.findByIdAndRemove(gameId);
};

export default {
  createGame,
  readAll,
  updateGame,
  deleteGame,
};
