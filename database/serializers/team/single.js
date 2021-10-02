const pickKeysFromObject = requireUtil("pickKeysFromObject");
const TeamMemberRepo = requireRepo("teamMember");

module.exports = async (instance) => {
  const attributes = ["uuid", "name", "slug", "creator_user_uuid"];
  const teamObject = pickKeysFromObject(instance, attributes);

  const teamMembersCount = await TeamMemberRepo.countAll({
    team_uuid: teamObject["uuid"],
  });
  teamObject["total_team_members"] = teamMembersCount;

  return teamObject;
};
