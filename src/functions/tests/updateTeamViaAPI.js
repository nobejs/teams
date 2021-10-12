const httpServer = requireHttpServer();
const contextClassRef = requireUtil("contextHelper");

module.exports = async (payload) => {
  let respondResult;
  try {
    const app = httpServer();

    respondResult = await app.inject({
      method: "PUT",
      url: `/teams/${payload.uuid}`,
      payload,
      headers: contextClassRef.headers,
    });
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
