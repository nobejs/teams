const knex = require("../../../../database/knex");

describe("Handler AnUserShouldBeAbleToGetTheirTeamMembers", () => {
  beforeEach(async () => {
    knex("teams").truncate();
    knex("teams_members").truncate();
  });

  it("Outsider shouldnt be able access a team members", async () => {
    let team1;
    let team2;
    let result;
    try {
      team1 = await requireTestFunction("createTeamViaHandler")({
        tenant: "handler-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      });

      team2 = await requireTestFunction("createTeamViaHandler")({
        tenant: "handler-test",
        name: "Rajiv's Personal Team 2",
        slug: "rajiv-personal-team-2",
        creator_user_uuid: "54c2779a-7200-4d98-be14-d4aec12b2fa9",
      });

      result = await requireTestFunction("getTeamMembersViaHandler")({
        uuid: team1.uuid,
        invoking_user_uuid: "54c2779a-7200-4d98-be14-d4aec12b2fa9",
      });
    } catch (error) {
      result = error;
    }

    expect(result.statusCode).toBe(403);
  });

  it("Member can get team members", async () => {
    let team1;
    let team2;
    let result;
    try {
      team1 = await requireTestFunction("createTeamViaHandler")({
        tenant: "handler-test",
        name: "Rajiv's member Team",
        slug: "rajiv-member-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      });

      team2 = await requireTestFunction("createTeamViaHandler")({
        tenant: "handler-test",
        name: "Rajiv's member Team 2",
        slug: "rajiv-member-team-2",
        creator_user_uuid: "54c2779a-7200-4d98-be14-d4aec12b2fa9",
      });

      result = await requireTestFunction("getTeamMembersViaHandler")({
        uuid: team1.uuid,
        invoking_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      });
    } catch (error) {
      result = error;
    }

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
          role: "owner",
          status: "accepted",
        }),
      ])
    );
  });
});
