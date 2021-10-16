const pickKeysFromObject = requireUtil("pickKeysFromObject");

module.exports = async (instance) => {
  const attributes = [
    "uuid",
    "name",
    "stripe_id",
    "customer_id",
    "status",
    "trial_ends_at",
    "ends_at",
  ];
  const subscriptionObject = pickKeysFromObject(instance, attributes);

  return subscriptionObject;
};
