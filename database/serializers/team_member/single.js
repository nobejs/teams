const pickKeysFromObject = requireUtil("pickKeysFromObject");

module.exports = async (instance) => {
  const attributes = [
    "uuid",
    "team_uuid",
    "user_uuid",
    "role",
    "status",
    "email",
  ];
  const memberObject = pickKeysFromObject(instance, attributes);

  return memberObject;
};
