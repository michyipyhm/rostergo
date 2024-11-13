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
  joining_date: string;
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

// export interface OtpUpdateResult {
//   user: LoginUser | null;
//   redirectToLogin: boolean;
//   redirectToRegister: boolean;
//   redirectToVerifyOtp: boolean;
// }

export interface verifyNumberResult {
  user: LoginUser | null;
  message: string;
  redirectToLogin: boolean;
  redirectToVerifyOtp: boolean;
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
  shifts: MonthlyShift[],
  shiftRequests: ShiftRequest[]
  leaveRequests: LeaveRequest[]
}