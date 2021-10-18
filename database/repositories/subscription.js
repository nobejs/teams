const knex = require("../knex");
const { addCreatedTimestamps } = require("./helper");

const create = async (payload) => {
  try {
    payload = addCreatedTimestamps(payload);

    let result = await knex.transaction(async (trx) => {
      const subscriptions = await trx("subscriptions")
        .insert(payload)
        .returning("*");
      return subscriptions[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const first = async (where = {}) => {
  try {
    let subscriptions = await knex("subscriptions")
      .where(where)
      .whereNull("deleted_at")
      .first();
    return subscriptions;
  } catch (error) {
    throw error;
  }
};

const update = async (sub_uuid, payload) => {
  try {
    payload["updated_at"] = new Date().toISOString();
    let subscription = await knex("subscriptions")
      .where("uuid", "=", sub_uuid)
      .update(payload)
      .returning("*");
    return subscription[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  first,
  update,
};
