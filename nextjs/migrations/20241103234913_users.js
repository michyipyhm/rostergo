/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('nickname', 255).unique()
        table.string('password', 255)
        table.string('phone', 255).notNullable()
        table.boolean('admin').defaultTo(false)
        table.enu('gender', ['male', 'female']).notNullable()
        table.string('otp').unsigned()
        table.integer('branch_id').unsigned()
        table.foreign('branch_id').references('branches.id')
        table.integer('position_id').unsigned()
        table.foreign('position_id').references('positions.id')
        table.enu('status', ['active', 'resigned', 'otp_pending', 'otp_verified']).notNullable()
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
