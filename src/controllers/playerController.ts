import Player, { PlayerI } from '../models/playerModel';
import { TeamI } from '../models/teamModel';

interface CreatePlayerInput {
  playerName: PlayerI['playerName'];
  playerNumber: PlayerI['playerNumber'];
  team: TeamI['_id'];
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

const readAll = async (): Promise<PlayerI[]> => {
  return await Player.find({});
};

const createPlayer = async ({
  playerName,
  playerNumber,
  team,
}: CreatePlayerInput): Promise<PlayerI> => {
  return await Player.create({
    playerName,
    playerNumber,
    team,
  });
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
