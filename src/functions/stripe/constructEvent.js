const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (eventBody, signature) => {
  try {
    const event = await stripe.webhooks.constructEvent(
      eventBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    return { data: event.data, eventType: event.type };
  } catch (error) {
    throw error;
  }
};
