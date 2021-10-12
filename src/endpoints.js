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
        ["post", "/customers", "Customers/UserCanCreateCustomer"],
        // ["put", "/customers/:customer_uuid", "customers/UserCanUpdateCustomer"],
        ["get", "/customers", "Customers/UserCanViewCustomers"],

        ["get", "/teams", "Teams/UserCanViewTeams"],
        ["post", "/teams", "Teams/UserCanCreateTeam"],
        ["put", "/teams/:team_uuid", "Teams/UserCanUpdateTeam"],
        ["get", "/teams/:team_uuid", "Teams/UserCanViewTeam"],
        ["delete", "/teams/:team_uuid", "Teams/UserCanDeleteTeam"],
        ["post", "/teams/:team_uuid/members", "Teams/UserCanCreateTeamMember"],

        [
          "put",
          "/teams/:team_uuid/members/:team_member_uuid",
          "Teams/UserCanUpdateTeamMember",
        ],
        [
          "delete",
          "/teams/:team_uuid/members/:team_member_uuid",
          "Teams/UserCanDeleteTeamMember",
        ],
        ["get", "/teams/:team_uuid/members", "Teams/UserCanViewTeamMembers"],
        [
          "post",
          "/teams/:team_uuid/stripe/subscribe",
          "Stripe/TeamCanSubscribeToStripePlan",
        ],
        [
          "put",
          "/teams/:team_uuid/stripe/upgrade-downgrade/:subscription_uuid",
          "Stripe/TeamCanChangeStripePlan",
        ],
        ["post", "/stripe/webhook", "Stripe/CanHandleStripeWebhook"],
      ],
    },
  ];
};
