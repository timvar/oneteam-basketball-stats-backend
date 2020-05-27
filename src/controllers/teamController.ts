import Team, { TeamI } from '../models/teamModel';
import Player, { PlayerI } from '../models/playerModel';
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
  teamId: TeamI['id'];
  user: UserI['_id'];
}

interface UpdateTeamInput {
  teamId: TeamI['id'];
  teamName: TeamI['teamName'];
}

interface DeleteTeamInput {
  teamId: TeamI['id'];
}

const readAll = async ({ user }: FindTeamsInput): Promise<TeamI[]> => {
  try {
    return await Team.find({ user });
  } catch (error) {
    throw new Error(error.message);
  }
};

const readTeam = async ({
  teamId,
  user,
}: FindTeamInput): Promise<TeamI | null> => {
  try {
    const team = await Team.findById(teamId);
    if (_isEqual(team?.user, user)) {
      return team;
    } else {
      throw new Error('unauthorized user');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const readPlayersByTeam = async ({
  teamId,
  user,
}: FindTeamInput): Promise<PlayerI[]> => {
  try {
    const team = await Team.findById(teamId);
    if (_isEqual(team?.user, user)) {
      return await Player.find({ team: team?._id });
    }
  } catch (error) {
    throw new Error('players not found');
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
  teamId,
  teamName,
}: UpdateTeamInput): Promise<TeamI | null> => {
  return await Team.findByIdAndUpdate(teamId, { teamName }, { new: true });
};

const deleteTeam = async ({ teamId }: DeleteTeamInput) => {
  await Team.findByIdAndRemove(teamId);
};

export default {
  createTeam,
  readAll,
  readTeam,
  readPlayersByTeam,
  updateTeam,
  deleteTeam,
};
