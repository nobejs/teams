const validator = requireValidator();
const TeamRepo = requireRepo("team");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamMemberRepo = requireRepo("teamMember");
const TeamSerializer = requireSerializer("team");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["tenant", "name", "slug"]);
  payload["creator_user_uuid"] = req.user;
  return payload;
};

const authorize = ({ prepareResult }) => {
  return true;
};

const validateInput = async (prepareResult) => {
  const constraints = {
    creator_user_uuid: {
      presence: {
        allowEmpty: false,
        message: "^Please enter creator_user_uuid",
      },
    },
    tenant: {
      presence: {
        allowEmpty: false,
        message: "^Please enter tenant",
      },
    },
    name: {
      presence: {
        allowEmpty: false,
        message: "^Please enter name",
      },
    },
    slug: {
      presence: {
        allowEmpty: false,
        message: "^Please enter slug",
      },
      type: "string",
      custom_callback: {
        message: "Slug should be unique",
        callback: async (payload) => {
          let count =
            typeof payload.slug === "string"
              ? await TeamRepo.countAll({
                  slug: prepareResult.slug,
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

const handle = async ({ prepareResult }) => {
  await validateInput(prepareResult);
  return await TeamRepo.create(prepareResult);
};

const respond = async ({ handleResult }) => {
  return await TeamSerializer.single(handleResult);
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
