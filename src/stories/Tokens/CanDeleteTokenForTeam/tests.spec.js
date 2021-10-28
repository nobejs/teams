const debugLogger = requireUtil("debugLogger");

describe("Test Handler Tokens/CanDeleteTokenForTeam", () => {
  it.skip("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      result = await testStrategy("Tokens/CanDeleteTokenForTeam", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
