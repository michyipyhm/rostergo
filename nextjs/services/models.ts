export interface Shift {
  id: number;
  user_nickname: string;
  slot_title: string;
  checkin_time: string;
  checkout_time: string;
  minute_over_time: number;
}

export interface Params {
  date: string;
}

export interface Employee {
  id: number;
  nickname: string;
  gender: string;
  phone: string;
  position: string;
  grade: string;
  employee_type: string;
  annual_leave: number;
  status: string;
  join_date: string;
  resign_date: string;
  updated_at: string;
  branch_id: number;
}

export interface LoginUser {
  id: number;
  nickname: string | null;
  phone: string;
  admin: boolean;
  gender: string | null;
  otp: string | null;
  branch_id: number | null;
  position_id: number | null;
  status: 'active' | 'resigned' | null;
  created_at: Date;
  updated_at: Date;
}

export interface mobileRegisterResult {
  success: boolean;
  message: string;
  userId?: number;
}

export interface mobileRegisterUser {
  id: number;
  nickname: string;
  password: string;
  phone: string;
  gender: 'male' | 'female';
}


export interface verifyNumberResult {
  user: LoginUser | null;
  message: string;
  redirectToLogin: boolean;
  redirectToVerifyOtp: boolean;
}


export interface User {
  id: number,
  nickname: string,
  gender: string,
  branch_id: number,
  status: string,
  positions_name: string,
  grade_name: string,
  position_type: string,
  weekend_restday: boolean,
  restday_per_week: number,
  restday_countby: string,
  annual_leave_quota: number,
}

export interface MonthlyShift {
  id: number,
  date: string,
  shift_slot_id: number,
  user_id: number,
  checkin_time: string,
  checkout_time: string,
  minute_late_time: number,
  minute_over_time: number,
  over_time_approve: boolean,
  status: string,
  created_at: string,
  updated_at: string,
  user_nickname: string,
  position_name: string,
  position_type: string,
  slot_title: string,
  slot_short_title: string,
}

export interface ShiftRequest {
  id: number,
  user_id: number,
  date: string,
  shift_slot_id: number,
  status: string,
  created_at: string,
  updated_at: string,
  user_nickname: string,
  position_name: string,
  position_type: string,
  slot_title: string,
  slot_short_title: string,
}

export interface LeaveRequest {
  id: number,
  user_id: number,
  shift_slot_id: number,
  start_date: string,
  end_date: string,
  duration: string,
  leave_type_id: number,
  sick_photo_prove: string,
  status: string,
  created_at: string,
  updated_at: string,
  user_nickname: string,
  position_name: string,
  position_type: string,
  slot_title: string,
  slot_short_title: string,
  leave_type_name: string,
  leave_type_short_name: string,
}

export interface MonthlyRosterData {
  users: User[],
  shifts: MonthlyShift[],
  shiftRequests: ShiftRequest[]
  leaveRequests: LeaveRequest[]
}