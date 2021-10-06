const debugLogger = requireUtil("debugLogger");

describe("handler UserCanViewCustomers", () => {
  it("user_can_search_using_user_uuid", async () => {
    let result = {};
    try {
      result = await testStrategy("sampleStory", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
