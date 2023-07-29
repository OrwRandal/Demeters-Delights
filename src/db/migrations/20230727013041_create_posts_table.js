/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('posts', (table) => {
    table.increments('post_id').primary();
    table.integer('user_id');
    table.string('ingredients').notNullable();
    table.string('instructions').notNullable();
    table.string('youtube');
    table.string('image');
    table.string('category').notNullable();
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('posts')
