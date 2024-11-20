var bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
}

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
    {
      name: "Manager",
      grade_id: 1,
      type: "Full Time",
      full_time_wage: 30000,
      weekend_restDay: true,
    },
    {
      name: "Salesperson1",
      grade_id: 3,
      type: "Full Time",
      full_time_wage: 18000,
      weekend_restDay: false,
      restDay_per_week: 2,
      restDay_countBy: "Sunday",
    },
    {
      name: "Salesperson2",
      grade_id: 4,
      type: "Full Time",
      full_time_wage: 16000,
      weekend_restDay: false,
      restDay_per_week: 1.5,
      restDay_countBy: "Sunday",
    },
    {
      name: "Salesperson(PT)",
      grade_id: 5,
      type: "Part Time",
      part_time_hour_wage: 65,
    },
  ]);

  await knex("branches").insert([
    { address: "Hong Kong" },
    { address: "Kowloon" },
  ]);

  await knex("shift_slots").insert([
    {
      branch_id: 1,
      title: "Shift A",
      short_title: "AA",
      start_time: "09:00:00",
      end_time: "12:00:00",
      work_hour: 3,
    },
    {
      branch_id: 1,
      title: "Shift B",
      short_title: "B",
      start_time: "12:00:00",
      end_time: "15:00:00",
      work_hour: 3,
    },
    {
      branch_id: 1,
      title: "Shift C",
      short_title: "C",
      start_time: "09:00:00",
      end_time: "11:00:00",
      work_hour: 2,
    },
    {
      branch_id: 1,
      title: "Shift D",
      short_title: "D",
      start_time: "11:00:00",
      end_time: "13:00:00",
      work_hour: 2,
    },
    {
      branch_id: 1,
      title: "Shift E",
      short_title: "E",
      start_time: "13:00:00",
      end_time: "15:00:00",
      work_hour: 3,
    },
  ]);

  await knex("users").insert([
    {
      nickname: "admin",
      password: await hashPassword("123123"),
      phone: "12312311",
      admin: true,
      gender: "male",
      branch_id: 1,
      position_id: 1,
      status: "active",
      join_date: "2024-01-01",
    },
    {
      nickname: "ft1",
      password: await hashPassword("123123"),
      phone: "12312322",
      admin: false,
      gender: "male",
      branch_id: 1,
      position_id: 2,
      status: "active",
      join_date: "2024-02-14",
    },
    {
      nickname: "ft2",
      password: await hashPassword("123123"),
      phone: "12312333",
      admin: false,
      gender: "female",
      branch_id: 1,
      position_id: 3,
      status: "active",
      join_date: "2024-03-09",
    },
    {
      nickname: "pt1",
      password: await hashPassword("123123"),
      phone: "12312344",
      admin: false,
      gender: "female",
      branch_id: null,
      position_id: 4,
      status: "active",
      join_date: "2024-07-01",
    },
    {
      nickname: "pt2",
      password: await hashPassword("123123"),
      phone: "12312355",
      admin: false,
      gender: "female",
      branch_id: 1,
      position_id: 4,
      status: "active",
      join_date: "2024-07-01",
    },
    {
      nickname: "pt3",
      password: await hashPassword("123123"),
      phone: "12312366",
      admin: false,
      gender: "male",
      branch_id: null,
      position_id: 4,
      status: "active",
      join_date: "2024-08-01",
    },
    {
      nickname: "resign1",
      password: await hashPassword("123123"),
      phone: "92312377",
      admin: false,
      gender: "male",
      branch_id: 1,
      position_id: 2,
      status: "resigned",
      join_date: "2024-09-01",
      resign_date: "2024-10-31",
    },
  ]);

  await knex("leave_types").insert([
    { name: "Sick Leave", short_name: "SL", quota: 2 },
    { name: "Rest Day", short_name: "RD" },
  ]);

  await knex("shift_requests").insert([
    { user_id: 4, date: "2024-11-28", shift_slot_id: 3, status: "approve" },
    { user_id: 4, date: "2024-11-29", shift_slot_id: 2, status: "pending" },
    { user_id: 5, date: "2024-11-28", shift_slot_id: 1, status: "pending" },
    { user_id: 5, date: "2024-11-29", shift_slot_id: 4, status: "pending" },
  ]);

  await knex("leave_requests").insert([
    {
      user_id: 2,
      shift_slot_id: 1,
      start_date: "2024-11-26",
      end_date: "2024-11-29",
      duration: "Half day(Pm)",
      leave_type_id: 1,
      status: "pending",
    },
    {
      user_id: 3,
      shift_slot_id: 2,
      start_date: "2024-11-27",
      end_date: "2024-11-28",
      duration: "Full day",
      leave_type_id: 2,
      status: "pending",
    },
    {
      user_id: 2,
      shift_slot_id: 1,
      start_date: "2024-12-20",
      end_date: "2024-12-21",
      duration: "Half day(Pm)",
      leave_type_id: 2,
      status: "approve",
    },
    {
      user_id: 2,
      shift_slot_id: 1,
      start_date: "2024-12-25",
      end_date: "2024-12-26",
      duration: "Half day(Pm)",
      leave_type_id: 1,
      status: "pending",
    },
  ]);

  await knex("shifts").insert([
    {
      date: "2024-11-25",
      shift_slot_id: 1,
      user_id: 2,
      checkin_time: "08:52:33",
      checkout_time: "12:01:15",
      over_time_approve: false,
      status: "check out",
    },
    {
      date: "2024-11-25",
      shift_slot_id: 2,
      user_id: 3,
      checkin_time: "11:55:48",
      checkout_time: "16:02:41",
      over_time_approve: true,
      status: "check out",
    },
    {
      date: "2024-11-25",
      shift_slot_id: 1,
      user_id: 4,
      checkin_time: "08:59:53",
      checkout_time: "12:07:43",
      over_time_approve: true,
      status: "check out",
    },
    {
      date: "2024-11-25",
      shift_slot_id: 2,
      user_id: 5,
      checkin_time: "11:54:18",
      checkout_time: "15:03:13",
      over_time_approve: true,
      status: "check out",
    },
    {
      date: "2024-11-26",
      shift_slot_id: 1,
      user_id: 2,
      checkin_time: "08:57:16",
      checkout_time: "12:30:49",
      over_time_approve: true,
      status: "check out",
    },
    {
      date: "2024-11-14",
      shift_slot_id: 2,
      user_id: 2,
    },
    {
      date: "2024-11-20",
      shift_slot_id: 3,
      user_id: 2,
    },
    {
      date: "2024-11-22",
      shift_slot_id: 4,
      user_id: 2,
    },
    {
      date: "2024-11-04",
      shift_slot_id: 5,
      user_id: 2,
    },
    {
      date: "2024-10-29",
      shift_slot_id: 3,
      user_id: 4,
      checkin_time: "09:11:16",
      checkout_time: "11:02:49",
      over_time_approve: false,
      status: "check out",
    }
  ]);
};
