exports.up = function (knex) {
  return knex.schema.createTable("customers", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("tenant", 255).notNullable();
    table.uuid("user_uuid").notNullable();
    table.string("stripe_id").nullable();
    table.jsonb("meta").nullable();
    table.datetime("created_at", { useTz: false });
    table.datetime("updated_at", { useTz: false });
    table.datetime("deleted_at", { useTz: false });
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
