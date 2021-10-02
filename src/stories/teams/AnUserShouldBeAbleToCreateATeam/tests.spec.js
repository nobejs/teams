const createTeam = async () => {
  let result = {};
  try {
    result = await testStrategy("teams/AnUserShouldBeAbleToCreateATeam", {
      prepareResult: {
        tenant: "handler-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      },
    });
  } catch (error) {
    console.log(error);
  }

  const { respondResult } = result;
  expect(respondResult).toMatchObject({
    uuid: expect.any(String),
    total_team_members: 1,
  });
};

const createTeamDifferentTenant = async () => {
  let result = {};
  try {
    result = await testStrategy("teams/AnUserShouldBeAbleToCreateATeam", {
      prepareResult: {
        tenant: "praise",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      },
    });
  } catch (error) {
    console.log(error);
  }

  const { respondResult } = result;
  expect(respondResult).toMatchObject({ uuid: expect.any(String) });
};

const createTeamSameSlugSameTenant = async () => {
  let result = {};
  try {
    result = await testStrategy("teams/AnUserShouldBeAbleToCreateATeam", {
      prepareResult: {
        tenant: "handler-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
      },
    });
  } catch (error) {
    result = error;
  }

  expect(result).toEqual(
    expect.objectContaining({
      errorCode: expect.stringMatching("InputNotValid"),
    })
  );
};

describe("test AnUserShouldBeAbleToCreateATeam", () => {
  it("an user can create a team", createTeam);

  it(
    "an user can create a team with same slug under different tenant",
    createTeamDifferentTenant
  );

  it(
    "an user should not be able create a team with same slug under same tenant",
    createTeamSameSlugSameTenant
  );
});
