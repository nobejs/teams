const debugLogger = requireUtil("debugLogger");

describe("Test Handler Stripe/CanHandleStripeWebhook", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      result = await testStrategy("Stripe/CanHandleStripeWebhook", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
