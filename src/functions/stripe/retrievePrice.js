const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (priceId) => {
  try {
    const result = await stripe.prices.retrieve(priceId);
    return result;
  } catch (error) {
    throw error;
  }
};
