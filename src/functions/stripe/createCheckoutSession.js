const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (team_owner_email, line_items) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: team_owner_email,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: line_items,
      success_url:
        process.env.STRIPE_SESSION_SUCCESS_URL ||
        "http://localhost:3000/stripe-session-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url:
        process.env.STRIPE_SESSION_CANCEL_URL ||
        "http://localhost:3000/stripe-session-cancel",
    });

    return session;
  } catch (error) {
    throw error;
  }
};
