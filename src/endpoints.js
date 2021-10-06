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
        ["get", "/teams", "teams/UserCanViewTeams"],
        ["post", "/teams", "teams/UserCanCreateTeam"],
        ["put", "/teams/:team_uuid", "teams/UserCanUpdateTeam"],
        ["get", "/teams/:team_uuid", "teams/UserCanViewTeam"],
        ["delete", "/teams/:team_uuid", "teams/UserCanDeleteTeam"],
        ["post", "/teams/:team_uuid/members", "teams/UserCanCreateTeamMember"],
        [
          "put",
          "/teams/:team_uuid/members/:team_member_uuid",
          "teams/UserCanUpdateTeamMember",
        ],
        [
          "delete",
          "/teams/:team_uuid/members/:team_member_uuid",
          "teams/UserCanDeleteTeamMember",
        ],
        ["get", "/teams/:team_uuid/members", "teams/UserCanViewTeamMembers"],
        [
          "post",
          "/teams/:team_uuid/stripe/subscribe",
          "stripe/TeamCanSubscribeToStripePlan",
        ],
        ["post", "/stripe/webhook", "stripe/CanHandleStripeWebhook"],
      ],
    },
  ];
};
