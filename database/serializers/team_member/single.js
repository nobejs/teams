const pickKeysFromObject = requireUtil("pickKeysFromObject");
const TeamMemberRepo = requireRepo("teamMember");

module.exports = async (instance) => {
  const attributes = ["uuid", "team_uuid", "user_uuid", "role", "status"];
  const memberObject = pickKeysFromObject(instance, attributes);

  return memberObject;
};
