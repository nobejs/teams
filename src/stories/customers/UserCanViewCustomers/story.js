const CustomerRepo = requireRepo("customer");
const findKeysFromRequest = requireUtil("findKeysFromRequest");
const CustomerSerializer = requireSerializer("customer");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, []);
  payload["user_uuid"] = req.user;
  return payload;
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult }) => {
  return await CustomerRepo.findAll({ user_uuid: prepareResult.user_uuid });
};

const respond = async ({ handleResult }) => {
  return await CustomerSerializer.list(handleResult);
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
