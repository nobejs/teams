describe("test AnUserShouldBeAbleToUpdateATeam", () => {
  it("an user can update a team", async () => {
    let respondResult;
    let createTeamResult;
    try {
      createTeamResult = await requireTestFunction("createTeam")({
        tenant: "handler-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      });
      respondResult = await requireTestFunction("updateTeam")({
        uuid: createTeamResult.uuid,
        name: "Rajiv's Personal Team 2",
        slug: "rajiv-personal-team-2",
        invoking_user_uuid: createTeamResult.creator_user_uuid,
      });
    } catch (error) {
      console.log("Error", error);
    }

    expect(respondResult).toMatchObject({
      uuid: createTeamResult.uuid,
      name: "Rajiv's Personal Team 2",
      slug: "rajiv-personal-team-2",
    });
  });

  it("an user should be able to update with same slug", async () => {
    let respondResult;
    let createTeamResult;
    try {
      createTeamResult = await requireTestFunction("createTeam")({
        tenant: "handler-test",
        name: "Rajiv's Company Team",
        slug: "rajiv-company-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      });

      respondResult = await requireTestFunction("updateTeam")({
        uuid: createTeamResult.uuid,
        name: "Rajiv's Company Team X",
        slug: "rajiv-company-team",
        invoking_user_uuid: createTeamResult.creator_user_uuid,
      });
    } catch (error) {
      console.log("Error", error);
    }

    expect(respondResult).toMatchObject({
      uuid: createTeamResult.uuid,
      name: "Rajiv's Company Team X",
      slug: "rajiv-company-team",
    });
  });
});
