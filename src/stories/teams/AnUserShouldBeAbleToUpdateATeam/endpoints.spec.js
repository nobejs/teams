const contextClassRef = requireTestFunction("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = require("../../../../database/knex");

describe("API AnUserShouldBeAbleToUpdateATeam", () => {
  beforeAll(() => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  beforeEach(async () => {
    knex("teams").truncate();
    knex("teams_members").truncate();
  });

  it("User can update team", async () => {
    let response;
    let createdResponse;

    try {
      createdResponse = await requireTestFunction("createTeamViaAPI")({
        tenant: "api-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
      });
      createdResponse = createdResponse.json();

      let team_uuid = createdResponse["uuid"];

      response = await requireTestFunction("updateTeamViaAPI")({
        tenant: "api-test",
        name: "Rajiv's Personal Team 2",
        slug: "rajiv-personal-team",
        uuid: team_uuid,
      });
    } catch (error) {
      response = error;
    }

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      name: "Rajiv's Personal Team 2",
    });
  });

  it("User can update team slug", async () => {
    let response;
    let createdResponse;

    try {
      createdResponse = await requireTestFunction("createTeamViaAPI")({
        tenant: "api-test",
        name: "Rajiv's Slug Team",
        slug: "rajiv-slug-team",
      });
      createdResponse = createdResponse.json();

      let team_uuid = createdResponse["uuid"];

      response = await requireTestFunction("updateTeamViaAPI")({
        tenant: "api-test",
        name: "Rajiv's Slug Team 2",
        slug: "rajiv-slug-team-2",
        uuid: team_uuid,
      });
    } catch (error) {
      response = error;
    }

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      name: "Rajiv's Slug Team 2",
      slug: "rajiv-slug-team-2",
    });
  });
});
