import Player, { PlayerI } from '../models/playerModel';
import { TeamI } from '../models/teamModel';
import { UserI } from '../models/userModel';

interface CreatePlayerInput {
  playerName: PlayerI['playerName'];
  playerNumber: PlayerI['playerNumber'];
  //team: TeamI['_id'];
  user: UserI['_id'];
}

interface FindPlayersInput {
  user: UserI['_id'];
}

interface UpdatePlayerInput {
  playerId: PlayerI['id'];
  playerName: PlayerI['playerName'];
  playerNumber: PlayerI['playerNumber'];
  team: TeamI['_id'];
}

interface DeletePlayerInput {
  playerId: PlayerI['id'];
}

const readAll = async ({ user }: FindPlayersInput): Promise<PlayerI[]> => {
  try {
    return await Player.find({ user });
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPlayer = async ({
  playerName,
  playerNumber,
  team,
  user,
}: CreatePlayerInput): Promise<PlayerI> => {
  try {
    return await Player.create({
      playerName,
      playerNumber,
      team,
      user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePlayer = async ({
  playerId,
  playerName,
  playerNumber,
  team,
}: UpdatePlayerInput): Promise<PlayerI | null> => {
  return await Player.findByIdAndUpdate(
    playerId,
    { playerName, playerNumber, team },
    { new: true }
  );
};

const deletePlayer = async ({ playerId }: DeletePlayerInput) => {
  await Player.findByIdAndRemove(playerId);
};

export default {
  createPlayer,
  readAll,
  updatePlayer,
  deletePlayer,
};
