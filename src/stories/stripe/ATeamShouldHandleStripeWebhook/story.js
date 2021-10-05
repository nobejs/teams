const prepare = ({ reqQuery, reqBody, reqParams, req }) => {
  console.log("webhook", req.headers);
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
