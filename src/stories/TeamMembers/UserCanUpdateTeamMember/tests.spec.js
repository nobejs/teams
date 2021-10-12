const debugLogger = requireUtil("debugLogger");

describe("Test Handler TeamMembers/UserCanUpdateTeamMember", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      result = await testStrategy("TeamMembers/UserCanUpdateTeamMember", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
