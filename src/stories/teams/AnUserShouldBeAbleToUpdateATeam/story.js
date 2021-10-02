const validator = requireValidator();
const TeamRepo = requireRepo("team");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const TeamSerializer = requireSerializer("team");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["name", "slug", "uuid"]);
  payload["invoking_user_uuid"] = req.user;
  return payload;
};

const augmentPrepare = async ({ prepareResult }) => {
  let team = await TeamRepo.first({
    uuid: prepareResult.uuid,
  });
  return { team };
};

const authorize = async ({ prepareResult, augmentPrepareResult }) => {
  if (
    augmentPrepareResult.team.creator_user_uuid ===
    prepareResult.invoking_user_uuid
  ) {
    return true;
  }

  return false;
};

const validateInput = async ({ prepareResult, augmentPrepareResult }) => {
  const constraints = {
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
              ? await TeamRepo.countAll(
                  {
                    slug: prepareResult.slug,
                    tenant: augmentPrepareResult.team.tenant,
                  },
                  {
                    uuid: prepareResult.uuid,
                  }
                )
              : -1;
          return count === 0 ? true : false;
        },
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult, augmentPrepareResult }) => {
  await validateInput({ prepareResult, augmentPrepareResult });
  return await TeamRepo.update(prepareResult.uuid, {
    name: prepareResult.name,
    slug: prepareResult.slug,
  });
};

const respond = async ({ handleResult }) => {
  return await TeamSerializer.single(handleResult);
};

module.exports = {
  prepare,
  augmentPrepare,
  authorize,
  handle,
  respond,
};
