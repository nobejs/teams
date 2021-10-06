module.exports = async (payload) => {
  let result;
  let respondResult;
  try {
    result = await testStrategy("teams/UserCanUpdateTeam", {
      prepareResult: payload,
    });
    respondResult = result.respondResult;
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
