const pickKeysFromObject = requireUtil("pickKeysFromObject");
const TeamMemberRepo = requireRepo("teamMember");
const SubscriptionRepo = requireRepo("subscription");
const SubscriptionSerializer = requireSerializer("subscription");

module.exports = async (instance, includes = []) => {
  const attributes = ["uuid", "name", "slug", "creator_user_uuid"];
  const teamObject = pickKeysFromObject(instance, attributes);

  if (includes.includes("subscription")) {
    const subscription = await SubscriptionRepo.first({
      team_uuid: teamObject["uuid"],
    });
    teamObject["subscription"] = await SubscriptionSerializer.single(
      subscription
    );
  }

  const teamMembersCount = await TeamMemberRepo.countAll({
    team_uuid: teamObject["uuid"],
  });
  teamObject["total_team_members"] = teamMembersCount;

  return teamObject;
};
