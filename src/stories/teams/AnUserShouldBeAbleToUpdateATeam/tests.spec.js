describe("test AnUserShouldBeAbleToUpdateATeam", () => {
  it("an user can update a team", async () => {
    let respondResult;
    try {
      let createTeamResult = await requireTestFunction("createTeam")();
      respondResult = await requireTestFunction("updateTeam")({
        uuid: createTeamResult.uuid,
        name: "Rajiv's Personal Team 2",
        slug: "rajiv-personal-team-2",
        invoking_user_uuid: createTeamResult.creator_user_uuid,
      });
    } catch (error) {}
  });
});
