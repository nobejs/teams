const pickKeysFromObject = requireUtil("pickKeysFromObject");

module.exports = async (instance) => {
  const attributes = ["uuid", "tenant", "user_uuid", "stripe_id", "meta"];
  const customerObject = pickKeysFromObject(instance, attributes);

  return customerObject;
};
