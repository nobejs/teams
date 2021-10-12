const httpServer = requireHttpServer();
const contextClassRef = requireUtil("contextHelper");

module.exports = async (
  payload = {
    tenant: "api-test",
    name: "Rajiv's Personal Team",
    slug: "rajiv-personal-team",
  },
  headers = contextClassRef.headers
) => {
  let respondResult;
  try {
    const app = httpServer();

    respondResult = await app.inject({
      method: "POST",
      url: "/teams",
      payload,
      headers,
    });
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
