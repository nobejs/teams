module.exports = async (payload) => {
  let result = {};
  try {
    result = await testStrategy("teams/AnUserShouldBeAbleToUpdateATeam", {
      prepareResult: payload,
    });
  } catch (error) {
    console.log(error);
  }

  const { respondResult } = result;

  return respondResult;
};
