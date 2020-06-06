import Team, { TeamI } from '../models/teamModel';
import Player, { PlayerI } from '../models/playerModel';
import Game, { GameI } from '../models/gameModel';
import { UserI } from '../models/userModel';
import _isEqual from 'lodash.isequal';

interface CreateTeamInput {
  teamName: TeamI['teamName'];
  user: UserI['_id'];
}

interface FindTeamsInput {
  user: UserI['_id'];
}

interface FindTeamInput {
  team: TeamI['id'];
  user: UserI['_id'];
}

interface UpdateTeamInput {
  team: TeamI['id'];
  teamName: TeamI['teamName'];
}

interface DeleteTeamInput {
  team: TeamI['id'];
}

const readAll = async ({ user }: FindTeamsInput): Promise<TeamI[]> => {
  try {
    return await Team.find({ user });
  } catch (error) {
    throw new Error(error.message);
  }
};

const readTeam = async ({
  team,
  user,
}: FindTeamInput): Promise<TeamI | null> => {
  try {
    const teamData = await Team.findById(team);
    if (_isEqual(teamData?.user, user)) {
      return teamData;
    } else {
      throw new Error('unauthorized user');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const readPlayersByTeam = async ({
  team,
  user,
}: FindTeamInput): Promise<PlayerI[]> => {
  try {
    const teamData = await Team.findById(team);
    if (_isEqual(teamData?.user, user)) {
      return await Player.find({ team: teamData?._id });
    }
  } catch (error) {
    throw new Error('players not found');
  }
  return [];
};

const readGamesByTeam = async ({
  team,
  user,
}: FindTeamInput): Promise<GameI[]> => {
  try {
    const teamData = await Team.findById(team);
    if (_isEqual(teamData?.user, user)) {
      return await Game.find({ team: teamData?._id });
    }
  } catch (error) {
    throw new Error('games not found');
  }
  return [];
};

const createTeam = async ({
  teamName,
  user,
}: CreateTeamInput): Promise<TeamI> => {
  return await Team.create({
    teamName,
    user,
  });
};

const updateTeam = async ({
  team,
  teamName,
}: UpdateTeamInput): Promise<TeamI | null> => {
  return await Team.findByIdAndUpdate(team, { teamName }, { new: true });
};

const deleteTeam = async ({ team }: DeleteTeamInput) => {
  await Team.findByIdAndRemove(team);
};

export default {
  createTeam,
  readAll,
  readTeam,
  readPlayersByTeam,
  readGamesByTeam,
  updateTeam,
  deleteTeam,
};
