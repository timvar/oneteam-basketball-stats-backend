import Stat, { StatI } from '../models/statModel';
import { UserI } from '../models/userModel';
import { GameI } from '../models/gameModel';

interface CreateStatInput {
  playerNumber: StatI['playerNumber'];
  onePm: StatI['onePm'];
  twoPm: StatI['twoPm'];
  threePm: StatI['threePm'];
  onePa: StatI['onePa'];
  twoPa: StatI['twoPa'];
  threePa: StatI['threePa'];
  orb: StatI['orb'];
  to: StatI['to'];
  drb: StatI['drb'];
  ast: StatI['ast'];
  blk: StatI['blk'];
  stl: StatI['stl'];
  user: UserI['_id'];
  game: GameI['_id'];
}

const readAll = async (): Promise<StatI[]> => {
  return await Stat.find({});
};

const createStat = async (stat: CreateStatInput): Promise<StatI> => {
  return await Stat.create(stat);
};

export default {
  createStat,
  readAll,
};
