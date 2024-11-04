/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('payslips', table => {
        table.increments('id').primary()
        table.date('date').notNullable()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.id')
        table.integer('salary').notNullable()
        table.integer('total_latetime_minute').defaultTo(0)
        table.integer('total_overtime_minute').defaultTo(0)
        table.integer('total_work_hour').unsigned()
        table.timestamps(false,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('payslips')
};
