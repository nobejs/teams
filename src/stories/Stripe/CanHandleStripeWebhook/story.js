const constructEvent = requireFunction("stripe/constructEvent");
const pickKeysFromObject = requireUtil("pickKeysFromObject");

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

const handle = ({ prepareResult, storyName }) => {
  const eventType = prepareResult.eventType;
  const eventData = prepareResult.data;

  // if (eventData["object"]["customer"]) {
  //   console.log(
  //     "eventType",
  //     eventType,
  //     eventData["object"]["customer"],
  //     eventData["object"]["sub_1Jl7STI0sgPwdxJLpHxTG26m"],
  //     eventData["object"]["metadata"],
  //     eventData
  //   );
  // }

  if (eventData["object"]["customer"]) {
    const eventObject = eventData["object"];

    switch (eventType) {
      case "checkout.session.completed":
        console.log(
          "checkout.session.completed",
          eventObject["customer"],
          eventObject["subscription"],
          eventObject["metadata"]["team_uuid"]
        );
        // Create subscription against the team
        break;

      case "customer.subscription.created":
        console.log(
          "customer.subscription.created",
          pickKeysFromObject(eventObject, [
            "customer",
            "subscription",
            "trial_end",
            "status",
            "metadata",
            "items.data",
            "sometihng",
          ])
        );
        // If the subscription is already created against a team,
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
