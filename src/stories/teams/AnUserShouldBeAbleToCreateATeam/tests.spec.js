describe("test AnUserShouldBeAbleToCreateATeam", () => {
  it("an user can create a team", async () => {
    let respondResult;
    try {
      respondResult = await requireTestFunction("createTeam")();
    } catch (error) {}

    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      total_team_members: 1,
    });
  });

  it("an user can create a team with same slug under different tenant", async () => {
    let respondResult;
    try {
      respondResult = await requireTestFunction("createTeamDifferentTenant")();
    } catch (error) {}
    expect(respondResult).toMatchObject({ uuid: expect.any(String) });
  });

  it("an user should not be able create a team with same slug under same tenant", async () => {
    let respondResult;
    try {
      respondResult = await requireTestFunction(
        "createTeamSameSlugSameTenant"
      )();
    } catch (error) {}

    expect(respondResult).toEqual(
      expect.objectContaining({
        errorCode: expect.stringMatching("InputNotValid"),
      })
    );
  });
});
