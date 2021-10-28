const knex = require("../knex");
const { addCreatedTimestamps } = require("./helper");
const { createHash } = require("crypto");
const underscoredColumns = requireUtil("underscoredColumns");

const createTokenForTeam = async (payload) => {
  try {
    payload = addCreatedTimestamps(payload);
    const hash = createHash("sha256");
    hash.update(`${Date.now()}`);
    hash.update(payload["team_uuid"]);
    payload["token"] = hash.digest("hex");

    let result = await knex.transaction(async (trx) => {
      const tokens = await trx("tokens").insert(payload).returning("*");
      return tokens[0];
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getKeysOfTeam = async (team_uuid) => {
  try {
    let tokens = await knex("tokens")
      .where({
        team_uuid,
      })
      .whereNull("tokens.deleted_at")
      .select(
        underscoredColumns([
          "tokens.uuid",
          "tokens.name",
          "tokens.creator_user_uuid",
          "tokens.abilities",
        ])
      );

    return tokens;
  } catch (error) {
    throw error;
  }
};

const deactivateToken = async (token) => {
  try {
    let result = await knex("tokens")
      .where({ token })
      .whereNull("tokens.deleted_at")
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

    return result;
  } catch (error) {
    throw error;
  }
};

const checkIfTokenExists = async (token) => {
  try {
    let result = await knex("tokens")
      .where({ token })
      .whereNull("tokens.deleted_at")
      .first();
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTokenForTeam,
  getKeysOfTeam,
  deactivateToken,
  checkIfTokenExists,
};
