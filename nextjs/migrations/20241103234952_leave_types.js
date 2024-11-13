/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('leave_types', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('short_name').notNullable()
        table.integer('quota')
        table.timestamps(false,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('leave_types')
};
