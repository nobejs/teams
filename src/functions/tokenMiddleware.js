const { pathToRegexp } = require("path-to-regexp");

const include = ["DELETE /teams/:team_uuid/tokens"];

module.exports = (req, reply, next) => {
  let needsTeamToken = false;

  include.forEach((p) => {
    let [method, path] = p.split(" ");
    let regex = pathToRegexp(path);
    if (method == req.method && regex.exec(req.routerPath) !== null) {
      needsTeamToken = true;
    }
  });

  if (needsTeamToken) {
    if (!req.headers["x-team-token"]) {
      return reply.code(403).send({ error: "Missing x-team-token" });
    } else {
      req.teamToken = req.headers["x-team-token"];
    }
  }

  next();
};
