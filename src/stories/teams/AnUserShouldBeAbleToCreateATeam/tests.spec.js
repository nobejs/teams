describe("test AnUserShouldBeAbleToCreateATeam", () => {
  it("an user can create a team", async () => {
    let respondResult;
    try {
      respondResult = await requireTestFunction("createTeam")({
        tenant: "handler-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      });
    } catch (error) {
      console.log("error", error);
    }

    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      total_team_members: 1,
    });
  });

  it("an user can create a team with same slug under different tenant", async () => {
    let respondResult;
    try {
      respondResult = await requireTestFunction("createTeam")({
        tenant: "praise",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      });
    } catch (error) {}
    expect(respondResult).toMatchObject({ uuid: expect.any(String) });
  });

  it("an user should not be able create a team with same slug under same tenant", async () => {
    let respondResult;
    try {
      respondResult = await requireTestFunction("createTeam")({
        tenant: "handler-test",
        name: "Rajiv's Another Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult).toEqual(
      expect.objectContaining({
        errorCode: expect.stringMatching("InputNotValid"),
      })
    );
  });
});
