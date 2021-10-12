const validator = requireValidator();
const TeamMemberRepo = requireRepo("teamMember");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const getUser = requireFunction("getUser");
const TeamMemberSerializer = requireSerializer("team_member");

const validateAction = async (payload) => {
  const constraints = {
    action: {
      presence: {
        allowEmpty: false,
        message: "^Please enter action",
      },
      inclusion: ["accept_invite"],
    },
  };

  await validator(payload, constraints);
};

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, [
    "team_uuid",
    "action",
    "team_member_uuid",
  ]);
  payload["invoking_user_uuid"] = req.user;
  payload["token"] = req.token;
  await validateAction(payload);
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  let teamMember = null;

  try {
    teamMember = await TeamMemberRepo.first({
      uuid: prepareResult.team_member_uuid,
    });
  } catch (error) {
    throw {
      statusCode: 401,
      message: "Invalid Member",
    };
  }

  let user = {};

  try {
    user = await getUser(prepareResult["token"]);
  } catch (error) {
    throw {
      statusCode: 401,
      message: "Unauthorized",
    };
  }

  return { teamMember, user };
};

const authorize = async ({ augmentPrepareResult }) => {
  if (!augmentPrepareResult.teamMember) {
    throw {
      message: "NotAuthorized",
      statusCode: 403,
    };
  }

  if (augmentPrepareResult.teamMember) {
    if (augmentPrepareResult.teamMember.status !== "invited") {
      throw {
        statusCode: 401,
        message:
          "The membership status is not invited. Either it's already accepted or invalid.",
      };
    }

    if (
      augmentPrepareResult.teamMember.email === augmentPrepareResult.user.email
    ) {
      throw {
        statusCode: 422,
        message: "Invalid",
      };
    }
  }

  return true;
};

const handle = async ({ prepareResult, augmentPrepareResult }) => {
  return await TeamMemberRepo.update(prepareResult.team_member_uuid, {
    status: "accepted",
    user_uuid: augmentPrepareResult.user.id,
  });
};

const respond = async ({ handleResult }) => {
  return await TeamMemberSerializer.single(handleResult);
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
