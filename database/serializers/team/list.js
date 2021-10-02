const single = require("./single");

module.exports = (teams) => {
  let result = teams.map((c) => {
    return single(c);
  });
  return result;
};
