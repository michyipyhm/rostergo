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
        { id: 1, name: "Manager", annual_leave_quota: 15 },
        { id: 2, name: "Assistant Manager", annual_leave_quota: 14 },
        { id: 3, name: "Senior", annual_leave_quota: 13 },
        { id: 4, name: "Junior", annual_leave_quota: 12 },
        { id: 5, name: "Part-time", annual_leave_quota: 12 },
    ]);

    await knex("positions").insert([
        { id: 1, name: "Manager", grade_id: 1, type: "full_time", full_time_wage: 30000, weekend_restDay: true },
        { id: 2, name: "Salesperson", grade_id: 3, type: "full_time", full_time_wage: 18000, weekend_restDay: false, restDay_countBy: "Sunday" },
        { id: 3, name: "Salesperson", grade_id: 4, type: "full_time", full_time_wage: 16000, weekend_restDay: false, restDay_countBy: "Sunday" },
        { id: 4, name: "Salesperson", grade_id: 5, type: "part_time", part_time_hour_wage: 65 },
    ]);

    await knex("branches").insert([
        { id: 1, address: "Hong Kong" },
    ]);

    await knex("shift_slots").insert([
        { id: 1, branch_id: 1, title: "Shift A", start_time: '09:00:00', end_time: '12:00:00' },
        { id: 2, branch_id: 1, title: "Shift B", start_time: '12:00:00', end_time: '15:00:00' },
        { id: 3, branch_id: 1, title: "Shift C", start_time: '09:00:00', end_time: '11:00:00' },
        { id: 4, branch_id: 1, title: "Shift D", start_time: '11:00:00', end_time: '13:00:00' },
        { id: 5, branch_id: 1, title: "Shift E", start_time: '13:00:00', end_time: '15:00:00' },
    ]);

    await knex("users").insert([
        {
            id: 1, nickname: "admin", password: "123123", phone: "12312311", admin: true,
            branch_id: 1, position_id: 1, status: "active"
        },
        {
            id: 2, nickname: "ft1", password: "123123", phone: "12312322", admin: false,
            branch_id: 1, position_id: 2, status: "active"
        },
        {
            id: 3, nickname: "ft2", password: "123123", phone: "12312333", admin: false,
            branch_id: 1, position_id: 3, status: "active"
        },
        {
            id: 4, nickname: "pt1", password: "123123", phone: "12312344", admin: false,
            branch_id: 1, position_id: 4, status: "active"
        },
        {
            id: 5, nickname: "pt2", password: "123123", phone: "12312355", admin: false,
            branch_id: 1, position_id: 4, status: "active"
        },
    ]);

    await knex("leave_types").insert([
        { id: 1, name: "Sick Leave", quota: 2 },
    ]);

    await knex("shift_requests").insert([
        { id: 1, user_id: 4, date: "2024-11-28", shift_slot_id: 3, status: "pending" },
        { id: 2, user_id: 4, date: "2024-11-29", shift_slot_id: 2, status: "pending" },
        { id: 3, user_id: 5, date: "2024-11-28", shift_slot_id: 1, status: "pending" },
        { id: 4, user_id: 5, date: "2024-11-29", shift_slot_id: 4, status: "pending" },
    ]);

    await knex("leave_requests").insert([
        {
            id: 1, user_id: 2, shift_slot_id: 1, start_date: "2024-11-28", end_date: "2024-11-01",
            duration: "Full day", leave_type_id: 1, status: "pending"
        },
        {
            id: 2, user_id: 3, shift_slot_id: 2, start_date: "2024-11-29", end_date: "2024-11-02",
            duration: "Full day", leave_type_id: 1, status: "pending"
        },
    ]);

    await knex("shifts").insert([
        {id: 1, date:"2024-11-07", shift_slot_id: 1, user_id: 2, checkin_time: "08:52:33", checkout_time: "12:01:15", over_time_approve: false, status: "check out"},
        {id: 2, date:"2024-11-07", shift_slot_id: 2, user_id: 3, checkin_time: "11:55:48", checkout_time: "16:02:41", over_time_approve: true, status: "check out"},
        {id: 3, date:"2024-11-04", shift_slot_id: 1, user_id: 4, checkin_time: "08:59:53", checkout_time: "12:07:43", over_time_approve: true, status: "check out"},
        {id: 4, date:"2024-11-03", shift_slot_id: 2, user_id: 5, checkin_time: "11:54:18", checkout_time: "15:03:13", over_time_approve: true, status: "check out"},
        {id: 5, date:"2024-11-02", shift_slot_id: 1, user_id: 2, checkin_time: "08:57:16", checkout_time: "12:30:49", over_time_approve: true, status: "check out"},
    ]);
};