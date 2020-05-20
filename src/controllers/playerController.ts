import Player, { PlayerI } from '../models/playerModel';

interface CreatePlayerInput {
  playerName: PlayerI['playerName'];
  playerNumber: PlayerI['playerNumber'];
}

interface UpdatePlayerInput {
  playerId: PlayerI['id'];
  playerName: PlayerI['playerName'];
  playerNumber: PlayerI['playerNumber'];
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
}: CreatePlayerInput): Promise<PlayerI> => {
  return await Player.create({
    playerName,
    playerNumber,
  });
};

const updatePlayer = async ({
  playerId,
  playerName,
  playerNumber,
}: UpdatePlayerInput): Promise<PlayerI | null> => {
  return await Player.findByIdAndUpdate(
    playerId,
    { playerName, playerNumber },
    { new: true },
  );
};

const deletePlayer = async ({ playerId }: DeletePlayerInput) => {
  await Player.findByIdAndRemove(playerId);
};

export default {
  createPlayer,
  readAll,
  updatePlayer,
  deletePlayer
};
