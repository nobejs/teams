const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamRepo = requireRepo("team");
const TokenRepo = requireRepo("token");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["team_uuid"]);
  payload["invoking_user_uuid"] = req.user;
  payload["team_token"] = req.teamToken;
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  let team;
  let tokenExists;

  try {
    team = await TeamRepo.first({
      uuid: prepareResult.team_uuid,
    });

    if (team === undefined) {
      throw {
        message: "Team not found",
        statusCode: 404,
      };
    }
  } catch (error) {
    throw {
      message: "Team not found",
      statusCode: 404,
    };
  }

  try {
    tokenExists = await TokenRepo.checkIfTokenExists(prepareResult.team_token);
    if (tokenExists === undefined) {
      throw {
        statusCode: 403,
        message: "Invalid Token",
      };
    }
  } catch (error) {
    throw error;
  }

  return { team, tokenExists };
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
  try {
    return await TokenRepo.deactivateToken(prepareResult.team_token);
  } catch (error) {
    throw error;
  }
};

const respond = () => {
  return {
    message: "Deleted successfully",
  };
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
