module.exports = async (payload) => {
  let respondResult;
  try {
    result = await testStrategy("TeamMembers/UserCanViewTeamMembers", {
      prepareResult: payload,
    });
    respondResult = result.respondResult;
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
