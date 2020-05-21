import Team, { TeamI } from '../models/teamModel';
import Player, { PlayerI } from '../models/playerModel';

interface CreateTeamInput {
  teamName: TeamI['teamName'];
}

interface FindOneTeamInput {
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

const readTeam = async ({teamId}: FindOneTeamInput): Promise<TeamI | null> => {
  return await Team.findById(teamId);
};

const readPlayersByTeam = async ({teamId}: FindOneTeamInput): Promise<PlayerI[]> => {
  const team = await Team.findById(teamId);
  return await Player.find({team: team?._id});
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