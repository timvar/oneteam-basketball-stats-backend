import Stat, { StatI } from '../models/statModel';

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
}

interface UpdateStatInput {
  statId: StatI['id'];
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
}

interface DeleteStatInput {
  statId: StatI['id'];
}

const readAll = async (): Promise<StatI[]> => {
  return await Stat.find({});
};

const createStat = async (stat: CreateStatInput): Promise<StatI> => {
  return await Stat.create(stat);
};

const updateStat = async (stat: UpdateStatInput): Promise<StatI | null> => {
  return await Stat.findByIdAndUpdate(stat.statId, stat, { new: true });
};

const deleteStat = async ({ statId }: DeleteStatInput) => {
  await Stat.findByIdAndRemove(statId);
};

export default {
  createStat,
  readAll,
  updateStat,
  deleteStat,
};
