/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('username', 255).unique().notNullable()
        table.string('password', 255).notNullable()
        table.string('phone', 255).notNullable()
        table.boolean('admin').defaultTo(false)
        table.string('gender')
        table.integer('branch_id').unsigned()
        table.foreign('branch_id').references('branches.id')
        table.integer('position_id').unsigned()
        table.foreign('position_id').references('positions.id')
        table.enu('status', ['active', 'resigned']).notNullable()
        table.timestamps(false,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('users')
};
