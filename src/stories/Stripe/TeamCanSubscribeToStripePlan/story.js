const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["team_uuid"]);
  payload["invoking_user_uuid"] = req.user;
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  try {
    let teamMember = await TeamMemberRepo.first({
      team_uuid: prepareResult.team_uuid,
      user_uuid: prepareResult.invoking_user_uuid,
    });

    return { teamMember };
  } catch (error) {
    throw {
      message: "Team not found",
      statusCode: 404,
    };
  }
};

const authorize = ({ prepareResult }) => {
  if (augmentPrepareResult.teamMember.role !== "owner") {
    throw {
      message: "Only owner can create subscription",
      statusCode: 403,
    };
  }

  return true;
};

const handle = ({ prepareResult, storyName }) => {
  return {};
};

const respond = ({ handleResult }) => {
  return handleResult;
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
