exports.up = async function (knex) {
  return knex.schema.createTable("subscriptions", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("team_uuid").notNullable();
    table.string("name", 255).notNullable();
    table.string("gateway", 255).notNullable();
    table.string("subscription_id", 255);
    table.string("customer_id", 255);
    table.string("status", 255);
    table.jsonb("items");
    table.datetime("trial_ends_at", { useTz: false });
    table.datetime("ends_at", { useTz: false });
    table.datetime("created_at", { useTz: false });
    table.datetime("updated_at", { useTz: false });
    table.datetime("deleted_at", { useTz: false });
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("subscriptions");
};
