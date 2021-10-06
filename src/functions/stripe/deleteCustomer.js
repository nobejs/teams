const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (customerId) => {
  try {
    const customer = await stripe.customers.del(customerId);
    return customer;
  } catch (error) {
    throw error;
  }
};
