const httpServer = requireHttpServer();
const contextClassRef = requireTestFunction("contextHelper");

module.exports = async (team_uuid) => {
  let respondResult;
  try {
    const app = httpServer();

    respondResult = await app.inject({
      method: "GET",
      url: `/teams/${team_uuid}/members`,
      headers: contextClassRef.headers,
    });
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
