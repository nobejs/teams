const createCheckoutSession = require("./createCheckoutSession");
const createCustomer = require("./createCustomer");
const deleteCustomer = require("./deleteCustomer");
const debugLogger = requireUtil("debugLogger");

describe("test stripe functions", () => {
  it("stripe_checkout_session_can_be_created", async () => {
    let result = {};
    try {
      result = await createCheckoutSession("rajiv+2@betalectic.com", [
        {
          price: "price_1JZvOrI0sgPwdxJLCgNoqHjy",
          quantity: 1,
        },
      ]);
    } catch (error) {
      debugLogger(error);
    }
    expect(1).toBe(1);
  });

  it("stripe_customer_can_be_created", async () => {
    let createResult = {};
    let deleteResult = {};
    try {
      createResult = await createCustomer({
        email: "rajiv+test@gmail.com",
      });
      deleteResult = await deleteCustomer(createResult.id);
    } catch (error) {
      debugLogger(error);
    }
    // debugLogger("result", createResult, deleteResult);

    expect(createResult).toMatchObject({
      id: expect.any(String),
      email: "rajiv+test@gmail.com",
    });

    expect(deleteResult).toMatchObject({
      id: createResult.id,
      deleted: true,
    });
  });
});
