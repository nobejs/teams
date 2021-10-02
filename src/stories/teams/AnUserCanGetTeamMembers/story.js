const TeamMemberRepo = requireRepo("teamMember");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamMemberSerializer = requireSerializer("team_member");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["uuid"]);
  payload["invoking_user_uuid"] = req.user;
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  let teamMember = await TeamMemberRepo.first({
    team_uuid: prepareResult.uuid,
    user_uuid: prepareResult.invoking_user_uuid,
  });

  return { teamMember };
};

const authorize = ({ prepareResult, augmentPrepareResult }) => {
  if (augmentPrepareResult.teamMember) {
    return true;
  }

  throw {
    message: "NotAuthorized",
    statusCode: 403,
  };
};

const handle = async ({ prepareResult }) => {
  return await TeamMemberRepo.findAll({
    team_uuid: prepareResult.uuid,
  });
};

const respond = async ({ handleResult }) => {
  return await TeamMemberSerializer.list(handleResult);
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
