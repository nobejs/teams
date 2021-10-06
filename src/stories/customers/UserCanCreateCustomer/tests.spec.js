const debugLogger = requireUtil("debugLogger");

describe("test UserCanCreateCustomer", () => {
  it("anyone_can_create_customer", async () => {
    let respondResult;
    try {
      respondResult = await requireTestFunction("createCustomerViaHandler")();
    } catch (error) {
      debugLogger("error", error);
    }

    expect(respondResult).toMatchObject({
      tenant: expect.any(String),
      stripe_id: expect.any(String),
      user_uuid: expect.any(String),
    });
  });
});
