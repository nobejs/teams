module.exports = async (payload) => {
  let respondResult;
  try {
    result = await testStrategy("teams/AnUserCanGetTeamMembers", {
      prepareResult: payload,
    });
    // console.log("result", result);
    respondResult = result.respondResult;
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
