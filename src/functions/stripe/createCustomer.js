const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (payload) => {
  try {
    const customer = await stripe.customers.create(payload);
    return customer;
  } catch (error) {
    throw error;
  }
};
