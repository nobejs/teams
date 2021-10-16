const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamMemberRepo = requireRepo("teamMember");
const TeamRepo = requireRepo("team");
const CustomerRepo = requireRepo("customer");
const getUser = requireFunction("getUser");
const validator = requireValidator();
const getStripePrice = requireFunction("stripe/retrievePrice");
const stripeCreateCustomer = requireFunction("stripe/createCustomer");
const createCheckoutSession = requireFunction("stripe/createCheckoutSession");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, [
    "team_uuid",
    "price_id",
    "success_url",
    "cancelled_url",
  ]);
  payload["invoking_user_uuid"] = req.user;
  payload["token"] = req.token;
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  let user = {};
  let team = {};
  let teamMember = {};
  let stripePrice = {};
  let stripeCustomer = {};

  try {
    team = await TeamRepo.first({
      uuid: prepareResult.team_uuid,
    });
  } catch (error) {
    throw {
      message: "Team not found",
      statusCode: 404,
      error: error.message,
    };
  }

  try {
    teamMember = await TeamMemberRepo.first({
      team_uuid: prepareResult.team_uuid,
      user_uuid: prepareResult.invoking_user_uuid,
    });
  } catch (error) {
    throw {
      message: "Team Member not found",
      statusCode: 404,
      error: error.message,
    };
  }

  try {
    user = await getUser(prepareResult["token"]);
  } catch (error) {
    throw {
      statusCode: 401,
      message: "Unauthorized",
    };
  }

  try {
    stripePrice = await getStripePrice(prepareResult["price_id"]);
  } catch (error) {
    throw {
      statusCode: 401,
      message: "Invalid Price",
    };
  }

  try {
    stripeCustomer = await CustomerRepo.first({
      user_uuid: prepareResult.invoking_user_uuid,
    });

    if (stripeCustomer) {
    } else {
      stripeCustomer = await stripeCreateCustomer({
        email: user.email,
        metadata: {
          user_id: prepareResult.invoking_user_uuid,
        },
      });

      stripeCustomer = await CustomerRepo.create({
        user_uuid: prepareResult.invoking_user_uuid,
        stripe_id: stripeCustomer["id"],
        tenant: "na",
      });
    }
  } catch (error) {
    throw {
      statusCode: 401,
      message: "Customer couldn't be created",
      error: error.message,
    };
  }

  return { teamMember, user, stripePrice, stripeCustomer };
};

const authorize = ({ augmentPrepareResult }) => {
  if (augmentPrepareResult.teamMember.role !== "owner") {
    throw {
      message: "Only owner can create subscription",
      statusCode: 403,
    };
  }

  return true;
};

const validateInput = async (prepareResult) => {
  const constraints = {
    price_id: {
      presence: {
        allowEmpty: false,
        message: "^Please enter price_id",
      },
    },
    success_url: {
      presence: {
        allowEmpty: false,
        message: "^Please enter success_url",
      },
    },
    cancelled_url: {
      presence: {
        allowEmpty: false,
        message: "^Please enter cancelled_url",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, augmentPrepareResult }) => {
  await validateInput(prepareResult);

  try {
    let result = await createCheckoutSession(
      prepareResult.success_url,
      prepareResult.cancelled_url,
      augmentPrepareResult["stripeCustomer"]["stripe_id"],
      [
        {
          price: prepareResult.price_id,
          quantity: 1,
        },
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const respond = ({ handleResult }) => {
  return { checkout_url: handleResult["url"] };
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
