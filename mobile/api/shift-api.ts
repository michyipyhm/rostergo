import { useQuery } from "@tanstack/react-query";
import { storageUtil } from "./auth-api";

const apiUrl = process.env.EXPO_PUBLIC_SERVER_HOST;

export interface ShiftPage {
  date: string;
  user_id: number;
  shift_slot: string;
  start_time: string;
  end_time: string;
  shift_slot_id: number;
}
// export function getShiftPageQuery(yearMoth: string | null) {
//   const { data, isLoading, error, refetch } = useQuery<ShiftPage[], Error>({
//     queryKey: ["getShiftList", yearMoth],
//     queryFn: async () => {
//       const result = await getShiftList(yearMoth);
//       return Array.isArray(result) ? result : [result];
//     },
//   });
//   return {data, refetch, isLoading, error}
// }

export async function getShiftList(
  yearMonth: string | null
): Promise<ShiftPage> {
  if (!yearMonth) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, hence +1
    yearMonth = `${year}-${month}`;
  }
  try {
    const token = await storageUtil.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await fetch(
      apiUrl + `/api/user/shiftlist?yearMonth=${yearMonth}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}
