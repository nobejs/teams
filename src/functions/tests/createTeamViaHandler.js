module.exports = async (
  payload = {
    tenant: "handler-test",
    name: "Rajiv's Personal Team",
    slug: "rajiv-personal-team",
    creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
  }
) => {
  let respondResult;
  try {
    result = await testStrategy("teams/AnUserShouldBeAbleToCreateATeam", {
      prepareResult: payload,
    });
    respondResult = result.respondResult;
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
