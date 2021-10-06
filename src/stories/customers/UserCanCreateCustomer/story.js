const validator = requireValidator();
const CustomerRepo = requireRepo("customer");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamSerializer = requireSerializer("team");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["tenant", "name", "slug"]);
  payload["creator_user_uuid"] = req.user;
  return payload;
};

const authorize = ({}) => {
  return true;
};

const validateInput = async (prepareResult) => {
  const constraints = {
    tenant: {
      presence: {
        allowEmpty: false,
        message: "^Please enter tenant",
      },
    },
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
            typeof payload.slug === "string"
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

  return validator(prepareResult, constraints);
};

const handle = ({ prepareResult, storyName }) => {
  await validateInput(prepareResult);
  await;
  return {};
};

const respond = ({ handleResult }) => {
  return {};
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
