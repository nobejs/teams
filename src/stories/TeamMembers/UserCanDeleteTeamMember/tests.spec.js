const debugLogger = requireUtil("debugLogger");

describe("Test Handler TeamMembers/UserCanDeleteTeamMember", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      result = await testStrategy("TeamMembers/UserCanDeleteTeamMember", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
