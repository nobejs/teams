const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (subscription_id, payload) => {
  try {
    const session = await stripe.subscriptions.update(subscription_id, payload);

    return session;
  } catch (error) {
    throw error;
  }
};
