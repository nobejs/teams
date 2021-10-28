const debugLogger = requireUtil("debugLogger");

describe("Test Handler TeamMembers/UserCanAcceptTeamMembership", () => {
  it.skip("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      result = await testStrategy("TeamMembers/UserCanAcceptTeamMembership", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
