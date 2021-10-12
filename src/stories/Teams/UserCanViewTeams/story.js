const TeamMemberRepo = requireRepo("teamMember");
const TeamSerializer = requireSerializer("team");
const TeamRepo = requireRepo("team");
const TeamMemberSerializer = requireSerializer("team_member");

const prepare = async ({ req }) => {
  const payload = {};
  payload["invoking_user_uuid"] = req.user;
  return payload;
};

const authorize = ({}) => {
  return true;
};

const handle = async ({ prepareResult }) => {
  const memberships = await TeamMemberRepo.findAll({
    user_uuid: prepareResult.invoking_user_uuid,
  });

  const teamUuids = memberships.map((m) => m.team_uuid);

  const teams = await TeamRepo.fetchTeamsFromUuids(teamUuids);

  const membershipsWithTeamData = await Promise.all(
    memberships.map(async (m) => {
      m = await TeamMemberSerializer.single(m);
      let team = teams.find((t) => t.uuid === m.team_uuid);
      m["team"] = await TeamSerializer.single(team);
      return m;
    })
  );

  return membershipsWithTeamData;
};

const respond = ({ handleResult }) => {
  return handleResult;
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
