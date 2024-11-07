/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('positions', table => {
        table.increments('id').primary()
        table.string('name', 255).notNullable()
        table.integer('grade_id').unsigned()
        table.foreign('grade_id').references('grades.id')
        table.enu('type', ['full_time', 'part_time']).notNullable()
        table.integer('part_time_hour_wage').unsigned()
        table.integer('full_time_wage').unsigned()
        table.boolean('weekend_restDay')
        table.float('restDay_per_week')
        table.enu('restDay_countBy', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
        table.timestamps(false,true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('positions')
};
