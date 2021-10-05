const contextClassRef = requireTestFunction("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();

describe("API AnUserCanGetTeamMembers", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
    await knex("teams").truncate();
    await knex("team_members").truncate();
  });

  it("User can get team members", async () => {
    let response;

    try {
      response = await requireTestFunction("createTeamViaAPI")();
      response = await requireTestFunction("getTeamMembersViaAPI")(
        response.json()["uuid"]
      );
    } catch (error) {
      response = error;
    }

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_uuid: contextClassRef.user.user_uuid,
          role: "owner",
          status: "accepted",
        }),
      ])
    );
  });
});
