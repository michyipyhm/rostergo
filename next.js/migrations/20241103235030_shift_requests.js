/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('shift_requests', table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.id')
        table.date('date').notNullable()
        table.integer('shift_slot_id').unsigned()
        table.foreign('shift_slot_id').references('shift_slots.id')
        table.enu('status', ['approve', 'disapprove', 'waiting list', 'pending'])
        table.timestamps(false,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('shift_requests')
};
