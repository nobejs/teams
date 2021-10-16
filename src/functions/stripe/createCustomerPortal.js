const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (customerId, returnUrl) => {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return portalSession;
  } catch (error) {
    throw error;
  }
};
