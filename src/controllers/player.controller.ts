import Player, { PlayerI } from '../models/player.model';

interface CreatePlayerInput {
  playerName: PlayerI['playerName'];
  playerNumber: PlayerI['playerNumber'];
}

export const getAll = async (): Promise<PlayerI[]> => {
  return await Player.find({});
};

export const createPlayer = async ({
  playerName,
  playerNumber,
}: CreatePlayerInput): Promise<PlayerI> => {
  return await Player.create({
    playerName,
    playerNumber,
  });
};

export default {
  createPlayer,
  getAll
};
