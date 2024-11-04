/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('shifts', table => {
        table.increments('id').primary()
        table.date('date').notNullable()
        table.integer('shift_slot_id').unsigned()
        table.foreign('shift_slot_id').references('shift_slots.id')
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.id')
        table.time('checkin_time')
        table.time('checkout_time')
        table.integer('minute_late_time').defaultTo(0)
        table.integer('minute_over_time').defaultTo(0)
        table.boolean('over_time_approve').defaultTo(false)
        table.enu('status', ['check in', 'check out', 'absent', 'sick leave', 'late', 'early leave'])
        table.timestamps(false,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('shifts')
};
