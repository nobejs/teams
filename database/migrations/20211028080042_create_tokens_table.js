exports.up = async function (knex) {
  return knex.schema.createTable("tokens", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("creator_user_uuid");
    table.uuid("team_uuid").notNullable();
    table.string("name", 255).notNullable();
    table.text("token").notNullable();
    table.jsonb("abilities");
    table.datetime("created_at", { useTz: false });
    table.datetime("updated_at", { useTz: false });
    table.datetime("deleted_at", { useTz: false });
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tokens");
};
