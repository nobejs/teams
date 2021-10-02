module.exports = async (payload) => {
  let result;
  let respondResult;
  try {
    result = await testStrategy("teams/AnUserShouldBeAbleToUpdateATeam", {
      prepareResult: payload,
    });
    respondResult = result.respondResult;
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
