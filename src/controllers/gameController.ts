import Game, { GameI } from '../models/gameModel';
import { TeamI } from '../models/teamModel';
import Stat, { StatI } from '../models/statModel';
import { UserI } from '../models/userModel';
import _isEqual from 'lodash.isequal';

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

interface FindGameInput {
  game: GameI['id'];
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

const readStatsByGame = async ({
  game,
  user,
}: FindGameInput): Promise<StatI[]> => {
  try {
    const gameData = await Game.findById(game);
    if (_isEqual(gameData?.user, user)) {
      return await Stat.find({ game: gameData?._id });
    }
  } catch (error) {
    throw new Error('stats not found');
  }
  return [];
};

const readGame = async ({
  game,
  user,
}: FindGameInput): Promise<GameI | null> => {
  try {
    const gameData = await Game.findById(game);
    if (_isEqual(gameData?.user, user)) {
      return gameData;
    } else {
      throw new Error('unauthorized user');
    }
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
  readStatsByGame,
  readGame,
  updateGame,
  deleteGame,
};
