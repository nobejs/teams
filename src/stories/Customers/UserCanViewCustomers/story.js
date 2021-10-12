const CustomerRepo = requireRepo("customer");
const CustomerSerializer = requireSerializer("customer");

const prepare = ({ req }) => {
  const payload = {};
  payload["user_uuid"] = req.user;
  return payload;
};

const authorize = ({}) => {
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
