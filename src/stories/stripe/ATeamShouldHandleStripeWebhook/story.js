const debugLogger = requireUtil("debugLogger");

const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  debugLogger("webhook", req.headers);
  return {};
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = ({ prepareResult, storyName }) => {
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
