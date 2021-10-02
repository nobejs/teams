const httpServer = requireHttpServer();
const randomUser = requireUtil("randomUser");
const contextClassRef = require("./ContextHelper");

module.exports = () => {
  beforeAll(() => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  describe("create teams", () => {
    it("User can create team", async () => {
      const app = httpServer();

      const payload = {
        tenant: "api-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
      };

      const response = await app.inject({
        method: "POST",
        url: "/teams",
        payload,
        headers: contextClassRef.headers,
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toMatchObject({
        uuid: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        total_team_members: 1,
        creator_user_uuid: contextClassRef.user.user_uuid,
      });
    });
  });
};
