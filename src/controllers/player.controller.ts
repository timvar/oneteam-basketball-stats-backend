import Player, { PlayerI } from '../models/player.model';

interface CreatePlayerInput {
  playerName: PlayerI['playerName'];
  playerNumber: PlayerI['playerNumber'];
}

interface UpdatePlayerInput {
  playerId: PlayerI['id'];
  playerName: PlayerI['playerName'];
  playerNumber: PlayerI['playerNumber'];
}

const getAll = async (): Promise<PlayerI[]> => {
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
  return await Player.findByIdAndUpdate(playerId, { playerName, playerNumber }, {new: true});
};

export default {
  createPlayer,
  getAll,
  updatePlayer
};
