const knex = require("../knex");
const underscoredColumns = requireUtil("underscoredColumns");

const countAll = async (where = {}, whereNot = {}) => {
  try {
    let team_members = await knex("team_members")
      .where(where)
      .whereNot(whereNot)
      .count({ count: "*" })
      .first();
    return parseInt(team_members.count);
  } catch (error) {
    throw error;
  }
};

const findAll = async (where = {}) => {
  try {
    let teams = await knex("team_members").where(where).select("*");
    return teams;
  } catch (error) {
    throw error;
  }
};

const getTeamsForAUser = async (where = {}) => {
  try {
    let memberships = await knex("teams")
      .join("team_members", "teams.uuid", "=", "team_members.team_uuid")
      .where(where)
      .select(
        underscoredColumns([
          "teams.uuid",
          "teams.name",
          "teams.slug",
          "teams.tenant",
          "team_members.uuid",
          "team_members.uuid",
          "team_members.user_uuid",
          "team_members.status",
          "team_members.role",
        ])
      );

    return memberships;
  } catch (error) {
    throw error;
  }
};

const first = async (where = {}) => {
  try {
    let team_members = await knex("team_members").where(where).first();
    return team_members;
  } catch (error) {
    throw error;
  }
};

const create = async (payload) => {
  try {
    payload["created_at"] = new Date().toISOString();
    payload["updated_at"] = new Date().toISOString();
    let team_members = await knex("team_members")
      .insert(payload)
      .returning("*");
    return team_members[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  first,
  countAll,
  findAll,
  getTeamsForAUser,
};
