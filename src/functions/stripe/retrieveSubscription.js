const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (subscription_id) => {
  try {
    const session = await stripe.subscriptions.retrieve(subscription_id);

    return session;
  } catch (error) {
    throw error;
  }
};
