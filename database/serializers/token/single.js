const pickKeysFromObject = requireUtil("pickKeysFromObject");

module.exports = async (instance, showToken = false) => {
  let attributes = [
    "uuid",
    "creator_user_uuid",
    "team_uuid",
    "name",
    "abilities",
  ];

  if (showToken) {
    attributes = [
      "uuid",
      "creator_user_uuid",
      "team_uuid",
      "name",
      "abilities",
      "token",
    ];
  }

  const customerObject = pickKeysFromObject(instance, attributes);

  return customerObject;
};
