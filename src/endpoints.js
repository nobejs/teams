module.exports = (app) => {
  app.get("/liveness", async (req, res) => {
    return res.code(200).send({ status: "I am alive" });
  });

  app.get("/readiness", async (req, res) => {
    return res.code(200).send({ status: "I am ready" });
  });

  return [
    {
      endpoints: [
        // Customers
        // ["post", "/customers", "Customers/UserCanCreateCustomer"],
        // ["put", "/customers/:customer_uuid", "customers/UserCanUpdateCustomer"],
        // ["get", "/customers", "Customers/UserCanViewCustomers"],

        ["get", "/teams", "Teams/UserCanViewTeams"],
        ["post", "/teams", "Teams/UserCanCreateTeam"],
        ["put", "/teams/:team_uuid", "Teams/UserCanUpdateTeam"],
        ["get", "/teams/:team_uuid", "Teams/UserCanViewTeam"],
        ["delete", "/teams/:team_uuid", "Teams/UserCanDeleteTeam"],

        // Team members

        ["get", "/teams/invites", "TeamMembers/UserCanViewInvites"],

        [
          "post",
          "/teams/:team_uuid/members",
          "TeamMembers/UserCanCreateTeamMember",
        ],
        [
          "post",
          "/teams/:team_uuid/members/:team_member_uuid/accept",
          "TeamMembers/UserCanAcceptTeamMembership",
        ],
        [
          "delete",
          "/teams/:team_uuid/members/:team_member_uuid",
          "TeamMembers/UserCanDeleteTeamMember",
        ],
        [
          "get",
          "/teams/:team_uuid/members",
          "TeamMembers/UserCanViewTeamMembers",
        ],

        // Subscriptions
        [
          "post",
          "/teams/:team_uuid/stripe/subscribe",
          "Stripe/TeamCanSubscribeToStripePlan",
        ],
        [
          "post",
          "/teams/:team_uuid/stripe/change",
          "Stripe/TeamCanChangeStripePlan",
        ],
        ["post", "/teams/stripe/webhook", "Stripe/CanHandleStripeWebhook"],

        // Tokens

        ["get", "/validate-token", "Tokens/CanValidateToken"],
        ["get", "/teams/:team_uuid/tokens", "Tokens/CanViewsTokensOfTeam"],
        ["post", "/teams/:team_uuid/tokens", "Tokens/CanCreateTokenForTeam"],
        ["delete", "/teams/:team_uuid/tokens", "Tokens/CanDeleteTokenForTeam"],
      ],
    },
  ];
};
