const debugLogger = requireUtil("debugLogger");
const { createHash } = require("crypto");

describe("Test Handler Tokens/CanCreateTokenForTeam", () => {
  it("can_create_crypto_token", async () => {
    let token = null;
    try {
      const hash = createHash("sha256");
      hash.update(`${Date.now()}`);
      token = hash.digest("hex");
    } catch (error) {
      debugLogger(error);
    }
    console.log(":token", token);
    expect(token).not.toBeNull();
  });
});
