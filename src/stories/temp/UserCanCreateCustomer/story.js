const validator = requireValidator();
const CustomerRepo = requireRepo("customer");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const pickKeysFromObject = requireUtil("pickKeysFromObject");
const stripeCreateCustomer = requireFunction("stripe/createCustomer");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["tenant", "meta"]);
  payload["user_uuid"] = req.user;
  return payload;
};

const authorize = ({}) => {
  return true;
};

const validateInput = async (prepareResult) => {
  const constraints = {
    user_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter user_uuid",
      },
    },
    meta: {
      presence: {
        allowEmpty: false,
        message: "^Please enter meta",
      },
    },
    tenant: {
      presence: {
        allowEmpty: false,
        message: "^Please enter tenant",
      },
    },
  };

  const constraints2 = {
    user_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter user_uuid",
      },
      type: "string",
      custom_callback: {
        message: "user_uuid should be unique inside a tenant",
        callback: async (payload) => {
          let count =
            typeof payload.user_uuid === "string"
              ? await CustomerRepo.countAll({
                  user_uuid: prepareResult.user_uuid,
                  tenant: prepareResult.tenant,
                })
              : -1;
          return count === 0 ? true : false;
        },
      },
    },
  };

  await validator(prepareResult, constraints);
  await validator(prepareResult, constraints2);
};

const handle = async ({ prepareResult, storyName }) => {
  try {
    await validateInput(prepareResult);
    const stripeCustomer = await stripeCreateCustomer(prepareResult.meta);
    let payload = pickKeysFromObject(prepareResult, [
      "tenant",
      "user_uuid",
      "meta",
    ]);
    payload["stripe_id"] = stripeCustomer["id"];
    payload["meta"]["metadata"] = { user_uuid: prepareResult.user_uuid };
    let customer = await CustomerRepo.create(payload);
    return customer;
  } catch (error) {
    throw error;
  }
};

const respond = ({ handleResult }) => {
  return handleResult;
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
