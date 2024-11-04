exports.seed = async function (knex) {
    await knex("grades").del();
    await knex("positions").del();
    await knex("branches").del();
    await knex("shift_slots").del();
    await knex("users").del();
    await knex("leave_types").del();
    await knex("shift_requests").del();
    await knex("leave_requests").del(); ``
    await knex("payslips").del();
    await knex("shifts").del();

    await knex("grades").insert([
        { name: "Manager", annual_leave_quota: 15 },
        { name: "Assistant Manager", annual_leave_quota: 14 },
        { name: "Senior", annual_leave_quota: 13 },
        { name: "Junior", annual_leave_quota: 12 },
        { name: "Part-time", annual_leave_quota: 12 },
    ]);

    await knex("positions").insert([
        { name: "Manager", grade_id: 1, type: "full_time", full_time_wage: 30000, restDay_per_week: 2 },
        { name: "Salesperson", grade_id: 3, type: "full_time", full_time_wage: 18000, restDay_per_week: 1.5 },
        { name: "Salesperson", grade_id: 4, type: "full_time", full_time_wage: 16000, restDay_per_week: 1.5 },
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
            username: "admin", password: "123123", phone: "99887766", admin: true,
            branch_id: 1, position_id: 1, status: "active"
        },
        {
            username: "ft1", password: "123123", phone: "99886677", admin: false,
            branch_id: 1, position_id: 2, status: "active"
        },
        {
            username: "ft2", password: "123123", phone: "99778866", admin: false,
            branch_id: 1, position_id: 3, status: "active"
        },
        {
            username: "pt1", password: "123123", phone: "99776688", admin: false,
            branch_id: 1, position_id: 4, status: "active"
        },
        {
            username: "pt2", password: "123123", phone: "99668877", admin: false,
            branch_id: 1, position_id: 4, status: "active"
        },
    ]);

    await knex("leave_types").insert([
        { name: "Sick Leave", quota: 2 },
    ]);

    await knex("shift_requests").insert([
        { user_id: 4, date: "2024-12-01", shift_slot_id: 3, status: "pending" },
        { user_id: 4, date: "2024-12-02", shift_slot_id: 2, status: "pending" },
        { user_id: 5, date: "2024-12-01", shift_slot_id: 1, status: "pending" },
        { user_id: 5, date: "2024-12-02", shift_slot_id: 4, status: "pending" },
    ]);

    await knex("leave_requests").insert([
        {
            user_id: 2, shift_slot_id: 1, start_date: "2024-12-01", end_date: "2024-12-01",
            start_time: '09:00:00', end_time: '12:00:00', leave_type_id: 1, status: "pending"
        },
        {
            user_id: 3, shift_slot_id: 2, start_date: "2024-12-02", end_date: "2024-12-02",
            start_time: '12:00:00', end_time: '15:00:00', leave_type_id: 1, status: "pending"
        },
    ]);
};