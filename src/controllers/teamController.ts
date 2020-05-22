import Team, { TeamI } from '../models/teamModel';
import Player, { PlayerI } from '../models/playerModel';

interface CreateTeamInput {
  teamName: TeamI['teamName'];
}

interface FindTeamInput {
  teamId: TeamI['id'];
}

interface UpdateTeamInput {
  teamId: TeamI['id'];
  teamName: TeamI['teamName'];
}

interface DeleteTeamInput {
  teamId: TeamI['id'];
}

const readAll = async (): Promise<TeamI[]> => {
  return await Team.find({});
};

const readTeam = async ({ teamId }: FindTeamInput): Promise<TeamI | null> => {
  return await Team.findById(teamId);
};

const readPlayersByTeam = async ({
  teamId,
}: FindTeamInput): Promise<PlayerI[]> => {
  try {
    const team = await Team.findById(teamId);
    return await Player.find({ team: team?._id });
  } catch (error) {
    throw new Error('players not found');
  }
};

const createTeam = async ({ teamName }: CreateTeamInput): Promise<TeamI> => {
  return await Team.create({
    teamName,
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
