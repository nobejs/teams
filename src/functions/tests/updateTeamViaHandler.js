module.exports = async (payload) => {
  let result;
  let respondResult;
  try {
    result = await testStrategy("Teams/UserCanUpdateTeam", {
      prepareResult: payload,
    });
    respondResult = result.respondResult;
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
