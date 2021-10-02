module.exports = async () => {
  let result = {};
  try {
    result = await testStrategy("teams/AnUserShouldBeAbleToCreateATeam", {
      prepareResult: {
        tenant: "handler-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      },
    });
  } catch (error) {
    console.log(error);
  }

  const { respondResult } = result;
  return respondResult;
};
