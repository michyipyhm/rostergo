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