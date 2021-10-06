module.exports = async (payload) => {
  let respondResult;
  try {
    result = await testStrategy("teams/UserCanViewTeamMembers", {
      prepareResult: payload,
    });
    // console.log("result", result);
    respondResult = result.respondResult;
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
