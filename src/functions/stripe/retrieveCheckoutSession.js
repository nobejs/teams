const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (sessionId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    throw error;
  }
};
