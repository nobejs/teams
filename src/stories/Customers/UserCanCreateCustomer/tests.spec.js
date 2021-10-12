const debugLogger = requireUtil("debugLogger");
const deleteStripeCustomer = requireFunction("stripe/deleteCustomer");

describe("test UserCanCreateCustomer", () => {
  it("anyone_can_create_customer", async () => {
    let respondResult;
    try {
      respondResult = await requireTestFunction("createCustomerViaHandler")({
        tenant: "handler-test",
        user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
        meta: {
          email: "rajiv+test@gmail.com",
        },
      });
    } catch (error) {
      debugLogger("error", error);
    }

    await deleteStripeCustomer(respondResult.stripe_id);

    expect(respondResult).toMatchObject({
      tenant: expect.any(String),
      stripe_id: expect.any(String),
      user_uuid: expect.any(String),
    });
  });
});
