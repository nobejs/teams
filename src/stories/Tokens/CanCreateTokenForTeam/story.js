const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamRepo = requireRepo("team");
const TokenRepo = requireRepo("token");
const TokenSerializer = requireSerializer("token");
const validator = requireValidator();

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["team_uuid", "name"]);
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

const validateInput = async (prepareResult) => {
  const constraints = {
    name: {
      presence: {
        allowEmpty: false,
        message: "^Please enter name",
      },
    },
    team_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter team_uuid",
      },
    },
    invoking_user_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter invoking_user_uuid",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult }) => {
  try {
    await validateInput(prepareResult);
    return TokenRepo.createTokenForTeam({
      team_uuid: prepareResult.team_uuid,
      name: prepareResult.name,
      creator_user_uuid: prepareResult.invoking_user_uuid,
      abilities: JSON.stringify(["*"]),
    });
  } catch (error) {
    throw error;
  }
};

const respond = ({ handleResult }) => {
  return TokenSerializer.single(handleResult, true);
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
