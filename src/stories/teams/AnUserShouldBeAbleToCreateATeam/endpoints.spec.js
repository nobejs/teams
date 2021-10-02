const contextClassRef = requireTestFunction("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();

describe("API AnUserShouldBeAbleToCreateATeam", () => {
  beforeAll(() => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  it("User can create team", async () => {
    let response;

    try {
      response = await requireTestFunction("createTeamViaAPI")();
    } catch (error) {
      response = error;
    }
    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      uuid: expect.any(String),
      name: expect.any(String),
      slug: expect.any(String),
      total_team_members: 1,
      creator_user_uuid: contextClassRef.user.user_uuid,
    });
  });

  it("User cannot create with same slug", async () => {
    let response;

    try {
      response = await requireTestFunction("createTeamViaAPI")({
        tenant: "api-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
      });
    } catch (error) {
      response = error;
    }

    expect(response.statusCode).toBe(422);
    expect(response.json()).toEqual(
      expect.objectContaining({
        errorCode: expect.stringMatching("InputNotValid"),
      })
    );
  });
});
