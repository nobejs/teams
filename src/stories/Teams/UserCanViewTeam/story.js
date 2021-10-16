const TeamRepo = requireRepo("team");
const TeamMemberRepo = requireRepo("teamMember");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamSerializer = requireSerializer("team");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["team_uuid"]);
  payload["invoking_user_uuid"] = req.user;
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  let teamMember = await TeamMemberRepo.first({
    team_uuid: prepareResult.team_uuid,
    user_uuid: prepareResult.invoking_user_uuid,
  });

  return { teamMember };
};

const authorize = ({ augmentPrepareResult }) => {
  if (augmentPrepareResult.teamMember) {
    return true;
  }

  throw {
    message: "NotAuthorized",
    statusCode: 403,
  };
};

const handle = async ({ prepareResult, storyName }) => {
  return await TeamRepo.first({
    uuid: prepareResult.team_uuid,
  });
};

const respond = async ({ handleResult }) => {
  return await TeamSerializer.single(handleResult, ["subscription"]);
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
