/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('leave_requests', table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.id')
        table.integer('shift_slot_id').unsigned()
        table.foreign('shift_slot_id').references('shift_slots.id')
        table.date('start_date')
        table.date('end_date')
        table.time('start_time')
        table.time('end_time')
        table.integer('leave_type_id').unsigned()
        table.foreign('leave_type_id').references('leave_types.id')
        table.string('sick_photo_prove', 255)
        table.enu('status', ['approve', 'disapprove', 'waiting list', 'pending'])
        table.timestamps(false,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('leave_requests')
};
