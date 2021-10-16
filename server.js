const Config = require("./config")();
const httpServer = requireHttpServer();

const server = httpServer({
  logger: process.env.DEBUG === "true" ? false : false,
});

server.addContentTypeParser(
  "application/json",
  { parseAs: "buffer" },
  function (req, body, done) {
    console.log("req", req.routerPath);

    try {
      if (req.routerPath == "/teams/stripe/webhook") {
        var newBody = {
          body: JSON.parse(body),
          raw: body,
        };
        done(null, newBody);
      } else {
        done(null, JSON.parse(body));
      }
    } catch (error) {
      error.statusCode = 400;
      done(error, undefined);
    }
  }
);

server.listen(process.env.PORT || 3000, "0.0.0.0", (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
