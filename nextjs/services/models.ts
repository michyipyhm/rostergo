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
