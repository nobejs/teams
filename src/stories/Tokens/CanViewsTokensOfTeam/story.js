const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamRepo = requireRepo("team");
const TokensRepo = requireRepo("token");
const TokenSerializer = requireSerializer("token");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["team_uuid"]);
  payload["invoking_user_uuid"] = req.user;
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  try {
    let team = await TeamRepo.first({
      uuid: prepareResult.team_uuid,
    });

    if (team === undefined) {
      throw {
        message: "Team not found",
        statusCode: 404,
      };
    }

    return { team };
  } catch (error) {
    throw {
      message: "Team not found",
      statusCode: 404,
    };
  }
};

const authorize = async ({ prepareResult, augmentPrepareResult }) => {
  if (
    augmentPrepareResult.team.creator_user_uuid ===
    prepareResult.invoking_user_uuid
  ) {
    return true;
  }

  throw {
    message: "NotAuthorized",
    statusCode: 403,
  };
};

const handle = async ({ prepareResult }) => {
  return await TokensRepo.getKeysOfTeam(prepareResult.team_uuid);
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
