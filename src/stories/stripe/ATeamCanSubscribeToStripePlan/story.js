const validator = requireValidator();
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamMemberRepo = requireRepo("teamMember");
const createCheckoutSession = require("../../../functions/stripe/createCheckoutSession");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, [
    "uuid",
    "price_id",
    "customer_email",
  ]);
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

const authorize = ({ augmentPrepareResult }) => {
  if (
    augmentPrepareResult.teamMember &&
    augmentPrepareResult.teamMember.role === "owner"
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
    price_id: {
      presence: {
        allowEmpty: false,
        message: "^Please choose a plan",
      },
    },
    customer_email: {
      presence: {
        allowEmpty: false,
        message: "^Please choose a customer_email",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, storyName }) => {
  await validateInput(prepareResult);
  try {
    let result = await createCheckoutSession(
      `${process.env.APP_URL}/teams/${prepareResult.uuid}/stripe/subscribe?session_id={CHECKOUT_SESSION_ID}`,
      `${process.env.APP_URL}/teams/${prepareResult.uuid}/stripe/subscribe?status=cancelled`,
      prepareResult.customer_email,
      [
        {
          price: prepareResult.price_id, //"price_1JZvOrI0sgPwdxJLCgNoqHjy",
          quantity: 1,
        },
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const respond = ({ handleResult, res }) => {
  return { redirect_to: handleResult.url, handleResult };
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
