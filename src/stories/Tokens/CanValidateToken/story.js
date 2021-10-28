const TokenRepo = requireRepo("token");
const TeamRepo = requireRepo("team");
const TeamMemberRepo = requireRepo("teamMember");

const prepare = async ({ req }) => {
  const payload = {};
  payload["invoking_user_uuid"] = req.user;
  payload["team_token"] = req.teamToken;
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  let tokenExists;
  let teamMember;

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

  try {
    teamMember = await TeamMemberRepo.first({
      team_uuid: tokenExists.team_uuid,
      user_uuid: prepareResult.invoking_user_uuid,
    });
  } catch (error) {
    throw {
      statusCode: 401,
      message: "Invalid Member",
    };
  }

  return { tokenExists, teamMember };
};

const authorize = ({ augmentPrepareResult }) => {
  if (augmentPrepareResult.teamMember) {
    return true;
  }

  throw {
    statusCode: 403,
    message: "No Access",
  };
};

const handle = () => {
  return {
    message: "Can Access",
  };
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
