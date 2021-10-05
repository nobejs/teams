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
        ["post", "/teams", "teams/AnUserShouldBeAbleToCreateATeam"],
        ["put", "/teams/:uuid", "teams/AnUserShouldBeAbleToUpdateATeam"],
        ["get", "/teams/:uuid/members", "teams/AnUserCanGetTeamMembers"],
        [
          "post",
          "/teams/:uuid/stripe/subscribe",
          "stripe/ATeamCanSubscribeToStripePlan",
        ],
        [
          "get",
          "/teams/:uuid/stripe/subscribe",
          "stripe/ATeamCanCompleteSubscribtionToStripePlan",
        ],
        [
          "post",
          "/teams/stripe/webhook",
          "stripe/ATeamShouldHandleStripeWebhook",
        ],
      ],
    },
  ];
};
