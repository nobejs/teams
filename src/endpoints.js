const createCheckoutSession = require("./functions/stripe/createCheckoutSession");
const retrieveCheckoutSession = require("./functions/stripe/retrieveCheckoutSession");

module.exports = (app) => {
  app.get("/liveness", async (req, res) => {
    return res.code(200).send({ status: "I am alive" });
  });

  app.get("/readiness", async (req, res) => {
    return res.code(200).send({ status: "I am ready" });
  });

  // app.get("/stripe-session-success", async (req, res) => {
  //   let result = null;
  //   try {
  //     result = await retrieveCheckoutSession(req.query.session_id);
  //   } catch (error) {}

  //   console.log("get stripe-session-success", req.query.session_id, result);
  //   return res.code(200).send({ status: "I am ready" });
  // });

  return [
    {
      endpoints: [
        ["post", "/teams", "teams/AnUserShouldBeAbleToCreateATeam"],
        ["put", "/teams/:uuid", "teams/AnUserShouldBeAbleToUpdateATeam"],
        ["get", "/teams/:uuid", "teams/AnUserCanGetTeamMembers"],
        [
          "post",
          "/teams/:uuid/stripe/subscribe",
          "stripe/ATeamCanSubscribeToStripePlan",
        ],
        [
          "get",
          "/teams/:uuid/stripe/subscribe",
          "stripe/ATeamCanSubscribeToStripePlan",
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
