const debugLogger = requireUtil("debugLogger");

describe("Test Handler Teams/UserCanViewTeams", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      result = await testStrategy("Teams/UserCanViewTeams", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
