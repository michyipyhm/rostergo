/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('shift_slots', table => {
        table.increments('id').primary()
        table.integer('branch_id').unsigned()
        table.foreign('branch_id').references('branches.id')
        table.string('title', 255).notNullable()
        table.string('short_title', 255).notNullable()
        table.time('start_time').notNullable()
        table.time('end_time').notNullable()
        table.integer('work_hour').unsigned()
        
        table.timestamps(false,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('shift_slots')
};
