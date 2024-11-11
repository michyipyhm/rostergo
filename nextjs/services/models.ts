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
  joining_date: string;
  updated_at: string;
}

export interface User {
  id: number;
  nickname: string;
  phone: string;
  admin: boolean;
  gender: string;
  otp: string | null;
  branch_id: number | null;
  position_id: number | null;
  status: 'active' | 'resigned' | 'otp_pending' | 'otp_verified';
  created_at: Date;
  updated_at: Date;
}