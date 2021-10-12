module.exports = async (
  payload = {
    tenant: "handler-test",
    user_uuid: "1098c53c-4a86-416b-b5e4-4677b70f5dfa",
  }
) => {
  let respondResult;
  try {
    result = await testStrategy("Customers/UserCanCreateCustomer", {
      prepareResult: payload,
    });
    respondResult = result.respondResult;
  } catch (error) {
    respondResult = error;
  }

  return respondResult;
};
