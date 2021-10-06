const single = require("./single");

module.exports = async (customers) => {
  let result = await Promise.all(
    customers.map((c) => {
      return single(c);
    })
  );

  return result;
};
