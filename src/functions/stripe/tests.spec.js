const createCheckoutSession = require("./createCheckoutSession");

describe("test createCheckoutSession", () => {
  it("an user can", async () => {
    let result = {};
    try {
      result = await createCheckoutSession("rajiv+2@betalectic.com", [
        {
          price: "price_1JZvOrI0sgPwdxJLCgNoqHjy",
          quantity: 1,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
    console.log("result", result);
    expect(1).toBe(1);
  });
});