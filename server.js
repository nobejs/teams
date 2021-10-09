const Config = require("./config")();
const httpServer = requireHttpServer();

const server = httpServer({
  logger: true,
});

server.listen(process.env.PORT || 3000, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
