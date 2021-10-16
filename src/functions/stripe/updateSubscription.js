const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (subscription_id, line_items) => {
  try {
    const session = await stripe.subscriptions.update(subscription_id, {
      items: line_items,
    });

    return session;
  } catch (error) {
    throw error;
  }
};
