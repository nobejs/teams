const constructEvent = requireFunction("stripe/constructEvent");
const pickKeysFromObject = requireUtil("pickKeysFromObject");
const SubscriptionRepo = requireRepo("subscription");

const prepare = async ({ req }) => {
  try {
    const constructedEvent = await constructEvent(
      req.body.raw,
      req.headers["stripe-signature"]
    );
    return constructedEvent;
  } catch (error) {
    throw error;
  }
};

const authorize = ({ prepareResult }) => {
  return true;
};

const handle = async ({ prepareResult, storyName }) => {
  const eventType = prepareResult.eventType;
  const eventData = prepareResult.data;
  let hookData = {};

  if (eventData["object"]["customer"]) {
    const eventObject = eventData["object"];

    switch (eventType) {
      case "customer.subscription.updated":
        hookData = pickKeysFromObject(eventObject, [
          "customer",
          "id",
          "trial_end",
          "status",
          "metadata",
          "items.data",
          "sometihng",
        ]);

        // console.log("customer.subscription.updated", hookData);

        try {
          const subscription = await SubscriptionRepo.first({
            gateway: "stripe",
            subscription_id: hookData.id,
          });

          if (subscription) {
            const updateSubscriptionPayload = {
              name: hookData.metadata.name,
              status: hookData.status,
              items: JSON.stringify(hookData["items.data"]),
              trial_ends_at: hookData.trial_end
                ? new Date(hookData.trial_end * 1000).toISOString()
                : subscription.trial_ends_at,
            };
            await SubscriptionRepo.update(
              subscription.uuid,
              updateSubscriptionPayload
            );
          }
        } catch (error) {
          throw error;
        }

        break;

      case "customer.subscription.created":
        hookData = pickKeysFromObject(eventObject, [
          "customer",
          "id",
          "trial_end",
          "status",
          "metadata",
          "items.data",
          "sometihng",
        ]);

        try {
          const subscription = await SubscriptionRepo.first({
            gateway: "stripe",
            subscription_id: hookData.id,
          });

          if (!subscription) {
            const createSubscriptionPayload = {
              gateway: "stripe",
              team_uuid: hookData.metadata.team_uuid,
              name: hookData.metadata.name,
              subscription_id: hookData.id,
              customer_id: hookData.customer,
              status: hookData.status,
              items: JSON.stringify(hookData["items.data"]),
              trial_ends_at: hookData.trial_end
                ? new Date(hookData.trial_end * 1000).toISOString()
                : null,
            };
            await SubscriptionRepo.create(createSubscriptionPayload);
          } else {
          }
        } catch (error) {
          console.log("error", error);
        }

        // If the subscription is already created against a team,
        break;

      case "customer.subscription.deleted":
        hookData = pickKeysFromObject(eventObject, [
          "customer",
          "id",
          "trial_end",
          "status",
          "metadata",
          "items.data",
          "sometihng",
        ]);

        try {
          const subscription = await SubscriptionRepo.first({
            gateway: "stripe",
            subscription_id: hookData.id,
          });

          if (subscription) {
            const updateSubscriptionPayload = {
              deleted_at: new Date().toISOString(),
              status: hookData.status,
            };

            await SubscriptionRepo.update(
              subscription.uuid,
              updateSubscriptionPayload
            );
          }
        } catch (error) {
          console.log(error);
          throw error;
        }

        break;

      case "invoice.paid":
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        break;
      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        break;
      default:
        console.log("Unhandled", eventType);
      // Unhandled event type
    }
  } else {
    {
      message: "Customer not available";
    }
  }

  return prepareResult.data;
};

const respond = ({ handleResult }) => {
  return handleResult;
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
