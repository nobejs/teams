const knex = require("../knex");
const { addCreatedTimestamps } = require("./helper");

const countAll = async (where = {}, whereNot = {}) => {
  try {
    let teams = await knex("customers")
      .where(where)
      .whereNot(whereNot)
      .count({ count: "*" })
      .first();
    return parseInt(teams.count);
  } catch (error) {
    throw error;
  }
};

const create = async (payload) => {
  try {
    payload = addCreatedTimestamps(payload);

    let result = await knex.transaction(async (trx) => {
      const customers = await trx("customers").insert(payload).returning("*");
      return customers[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const findAll = async (where = {}, whereNot = {}) => {
  try {
    let customers = await knex("customers")
      .where(where)
      .whereNot(whereNot)
      .select("*");
    return customers;
  } catch (error) {
    throw error;
  }
};

const first = async (where = {}) => {
  try {
    let customers = await knex("customers").where(where).first();
    return customers;
  } catch (error) {
    throw error;
  }
};

const update = async (team_uuid, payload) => {
  try {
    payload["updated_at"] = new Date().toISOString();
    let team = await knex("teams")
      .where("uuid", "=", team_uuid)
      .update(payload)
      .returning("*");
    return team[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  first,
  update,
  countAll,
  findAll,
};
