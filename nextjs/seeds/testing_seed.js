exports.seed = async function (knex) {
    await knex("shifts").del();
    await knex("payslips").del();
    await knex("leave_requests").del();
    await knex("shift_requests").del();
    await knex("leave_types").del();
    await knex("users").del();
    await knex("shift_slots").del();
    await knex("branches").del();
    await knex("positions").del();
    await knex("grades").del();

    await knex("grades").insert([
        { name: "Manager", annual_leave_quota: 15 },
        { name: "Assistant Manager", annual_leave_quota: 14 },
        { name: "Senior", annual_leave_quota: 13 },
        { name: "Junior", annual_leave_quota: 12 },
        { name: "Part-time", annual_leave_quota: 12 },
    ]);

    await knex("positions").insert([
        { name: "Manager", grade_id: 1, type: "full_time", full_time_wage: 30000, weekend_restDay: true },
        { name: "Salesperson", grade_id: 3, type: "full_time", full_time_wage: 18000, weekend_restDay: false, restDay_countBy: "Sunday" },
        { name: "Salesperson", grade_id: 4, type: "full_time", full_time_wage: 16000, weekend_restDay: false, restDay_countBy: "Sunday" },
        { name: "Salesperson", grade_id: 5, type: "part_time", part_time_hour_wage: 65 },
    ]);

    await knex("branches").insert([
        { address: "Hong Kong" },
    ]);

    await knex("shift_slots").insert([
        { branch_id: 1, title: "Shift A", start_time: '09:00:00', end_time: '12:00:00' },
        { branch_id: 1, title: "Shift B", start_time: '12:00:00', end_time: '15:00:00' },
        { branch_id: 1, title: "Shift C", start_time: '09:00:00', end_time: '11:00:00' },
        { branch_id: 1, title: "Shift D", start_time: '11:00:00', end_time: '13:00:00' },
        { branch_id: 1, title: "Shift E", start_time: '13:00:00', end_time: '15:00:00' },
    ]);

    await knex("users").insert([
        {
            nickname: "admin", password: "123123", phone: "12312311", admin: true,
            branch_id: 1, position_id: 1, status: "active"
        },
        {
            nickname: "ft1", password: "123123", phone: "12312322", admin: false,
            branch_id: 1, position_id: 2, status: "active"
        },
        {
            nickname: "ft2", password: "123123", phone: "12312333", admin: false,
            branch_id: 1, position_id: 3, status: "active"
        },
        {
            nickname: "pt1", password: "123123", phone: "12312344", admin: false,
            branch_id: 1, position_id: 4, status: "active"
        },
        {
            nickname: "pt2", password: "123123", phone: "12312355", admin: false,
            branch_id: 1, position_id: 4, status: "active"
        },
    ]);

    await knex("leave_types").insert([
        { name: "Sick Leave", quota: 2 },
    ]);

    await knex("shift_requests").insert([
        { user_id: 4, date: "2024-11-28", shift_slot_id: 3, status: "pending" },
        { user_id: 4, date: "2024-11-29", shift_slot_id: 2, status: "pending" },
        { user_id: 5, date: "2024-11-28", shift_slot_id: 1, status: "pending" },
        { user_id: 5, date: "2024-11-29", shift_slot_id: 4, status: "pending" },
    ]);

    await knex("leave_requests").insert([
        {
            user_id: 2, shift_slot_id: 1, start_date: "2024-11-28", end_date: "2024-11-01",
            duration: "Full day", leave_type_id: 1, status: "pending"
        },
        {
            user_id: 3, shift_slot_id: 2, start_date: "2024-11-29", end_date: "2024-11-02",
            duration: "Full day", leave_type_id: 1, status: "pending"
        },
    ]);
};