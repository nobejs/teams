const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (payload) => {
  try {
    const session = await stripe.checkout.sessions.create(payload);

    return session;
  } catch (error) {
    throw error;
  }
};
