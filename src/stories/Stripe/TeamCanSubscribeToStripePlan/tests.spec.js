const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler Stripe/TeamCanSubscribeToStripePlan", () => {
  beforeEach(async () => {
    await knex("teams").truncate();
    await knex("team_members").truncate();
  });

  it("user_can_subscribe_to_a_valid_price_with_quantity", async () => {
    let result = {};
    try {
      let createdTeam = await requireTestFunction("createTeamViaHandler")({
        tenant: "handler-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team",
        creator_user_uuid: "63411080-cced-4a5e-8230-8673c3172308",
      });

      result = await testStrategy("Stripe/TeamCanSubscribeToStripePlan", {
        prepareResult: {
          team_uuid: createdTeam.uuid,
          price_id: process.env.QUANTITY_BASED_PRICE_ID,
          success_url: "https://example.com",
          cancelled_url: "https://example.com",
          invoking_user_uuid: "63411080-cced-4a5e-8230-8673c3172308",
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NDM0OTY0Mi1hODk0LTQxMTUtODZlNS0zODMyNjBlNzY5ZjciLCJqdGkiOiIwMzkyMmQ1NjE3ZTczMzBjNWU0NzZlMmRhNzI4NjhkYTJmZDEyZWFmZWIwOWQ0YTYzNTMzM2E3MDJkYmRiMWVhNGVkMDBlNWFkNzkxMjZiYSIsImlhdCI6MTYzNDUzNjU2MS42Mzk0MjEsIm5iZiI6MTYzNDUzNjU2MS42Mzk0MjQsImV4cCI6MTY2NjA3MjU2MS42MzMxODUsInN1YiI6IjYzNDExMDgwLWNjZWQtNGE1ZS04MjMwLTg2NzNjMzE3MjMwOCIsInNjb3BlcyI6W119.lnGWwCAb8HT41IxzkQfszLS06WH5w_yUr6DII3gnhf3QoQY3LOvE6m7AEtSb_sAv6h4QrN9vL0Tca_r0rY5CzTSYXyRPmJKs69SQ9N_ewRh7ArhK4INukot3zw9fFwKqFOnmF2HuWfDgDJO9gNBVRP2mzldvUiRnl57-14UnR_mnXAAj1USnxshOXo1XLGpbXWHCFN-PG08gBruyKeR0af-ef9gjlm6Av3z7QmHaDlnmvecs5OzBI9SRZ9vJv5VbTVzcdiz16zZALECFZPtYo5j3MGSjjLsAWqj731L-RPEBAXTyVJF2Ky4Ypx19X1FACb7M1R6PifF78izb7U7jQw",
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;

    expect(respondResult).toMatchObject({
      checkout_url: expect.any(String),
    });
  });

  it.skip("user_can_subscribe_to_a_valid_price_with_exclude_quantity", async () => {
    let result = {};
    try {
      let createdTeam = await requireTestFunction("createTeamViaHandler")({
        tenant: "handler-test",
        name: "Rajiv's Personal Team",
        slug: "rajiv-personal-team-1",
        creator_user_uuid: "63411080-cced-4a5e-8230-8673c3172308",
      });

      result = await testStrategy("Stripe/TeamCanSubscribeToStripePlan", {
        prepareResult: {
          team_uuid: createdTeam.uuid,
          price_id: process.env.METERED_PRICE_ID,
          success_url: "https://example.com",
          cancelled_url: "https://example.com",
          invoking_user_uuid: "63411080-cced-4a5e-8230-8673c3172308",
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NDM0OTY0Mi1hODk0LTQxMTUtODZlNS0zODMyNjBlNzY5ZjciLCJqdGkiOiIwMzkyMmQ1NjE3ZTczMzBjNWU0NzZlMmRhNzI4NjhkYTJmZDEyZWFmZWIwOWQ0YTYzNTMzM2E3MDJkYmRiMWVhNGVkMDBlNWFkNzkxMjZiYSIsImlhdCI6MTYzNDUzNjU2MS42Mzk0MjEsIm5iZiI6MTYzNDUzNjU2MS42Mzk0MjQsImV4cCI6MTY2NjA3MjU2MS42MzMxODUsInN1YiI6IjYzNDExMDgwLWNjZWQtNGE1ZS04MjMwLTg2NzNjMzE3MjMwOCIsInNjb3BlcyI6W119.lnGWwCAb8HT41IxzkQfszLS06WH5w_yUr6DII3gnhf3QoQY3LOvE6m7AEtSb_sAv6h4QrN9vL0Tca_r0rY5CzTSYXyRPmJKs69SQ9N_ewRh7ArhK4INukot3zw9fFwKqFOnmF2HuWfDgDJO9gNBVRP2mzldvUiRnl57-14UnR_mnXAAj1USnxshOXo1XLGpbXWHCFN-PG08gBruyKeR0af-ef9gjlm6Av3z7QmHaDlnmvecs5OzBI9SRZ9vJv5VbTVzcdiz16zZALECFZPtYo5j3MGSjjLsAWqj731L-RPEBAXTyVJF2Ky4Ypx19X1FACb7M1R6PifF78izb7U7jQw",
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;

    expect(respondResult).toMatchObject({
      checkout_url: expect.any(String),
    });
  });
});
