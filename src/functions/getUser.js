const httpsRequestPromise = requireUtil("httpsRequestPromise");
const url = require("url");

module.exports = (token) => {
  var authTokenOptions = Object.assign(
    {},
    url.parse(`${process.env.AUTH_ENDPOINT}/user`),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  return new Promise(async (resolve, reject) => {
    try {
      let response = await httpsRequestPromise(authTokenOptions);
      resolve(response);
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
};
