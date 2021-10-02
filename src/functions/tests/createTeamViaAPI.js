const httpServer = requireHttpServer();
const contextClassRef = requireTestFunction("contextHelper");

module.exports = async (
  payload = {
    tenant: "api-test",
    name: "Rajiv's Personal Team",
    slug: "rajiv-personal-team",
  }
) => {
  let respondResult;
  try {
    const app = httpServer();

    respondResult = await app.inject({
      method: "POST",
      url: "/teams",
      payload,
      headers: contextClassRef.headers,
    });
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
