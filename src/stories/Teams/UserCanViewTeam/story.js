const TeamRepo = requireRepo("team");
const TeamMemberRepo = requireRepo("teamMember");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamSerializer = requireSerializer("team");
const createCustomerPortal = requireFunction("stripe/createCustomerPortal");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["team_uuid", "stripe_return_url"]);

  console.log("payload", payload);

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

const respond = async ({ prepareResult, handleResult }) => {
  try {
    const teamObject = await TeamSerializer.single(handleResult, [
      "subscription",
    ]);

    if (
      teamObject["subscription"] &&
      teamObject["subscription"]["customer_id"]
    ) {
      teamObject["customer_portal"] = await createCustomerPortal(
        teamObject["subscription"]["customer_id"],
        prepareResult.stripe_return_url
      );
    }

    return teamObject;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
