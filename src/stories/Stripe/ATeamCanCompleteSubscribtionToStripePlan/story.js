const findKeysFromRequest = requireUtil("findKeysFromRequest");
const retrieveCheckoutSession = require("../../../functions/stripe/retrieveCheckoutSession");

const prepare = async ({ req }) => {
  const payload = findKeysFromRequest(req, ["session_id"]);
  return payload;
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult }) => {
  try {
    let result = await retrieveCheckoutSession(prepareResult["session_id"]);
    return result;
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
