"use client";
import React from "react";
import styles from "./LeaveRequest.module.scss";
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Table from "react-bootstrap/Table";

interface LeaveRequest {
  id: number;
  user_nickname: string;
  leave_type_name: string;
  start_date: string;
  end_date: string;
  slot_title: string;
  duration: string;
  status: string;
  sick_photo_prove: string;
  created_at: string;
}

interface LeaveRequestProps {
  leaveRequests: LeaveRequest[];
}

function LeaveRequest(props: LeaveRequestProps) {
  const router = useRouter();

  const results = props.leaveRequests;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleLeaveRequest = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("token");

      console.log("localStorage: ", token);

      const response = await fetch("/api/admin/handleleaverequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update leave request");
      }

      const result = await response.json();
      alert(result.message);
      router.refresh();
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };

  return (
    <div className={styles.leaveRequestTable}>
      {/* <div className={styles.tableContainer}> */}
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>Staff</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Shift Slot</th>
            <th>Duration</th>
            <th>Summit Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((leaveRequest) => (
              <tr key={leaveRequest.id}>
                <td>{leaveRequest.user_nickname}</td>
                <td>{leaveRequest.leave_type_name}</td>
                <td>{formatDate(leaveRequest.start_date)}</td>
                <td>{formatDate(leaveRequest.end_date)}</td>
                <td>{leaveRequest.slot_title}</td>
                <td>{leaveRequest.duration}</td>
                <td>{formatDateTime(leaveRequest.created_at)}</td>
                <td>{leaveRequest.status}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.approveButton}
                    onClick={() =>
                      handleLeaveRequest(leaveRequest.id, "approve")
                    }
                  >
                    Approve
                  </button>
                  <button
                    className={styles.rejectButton}
                    onClick={() =>
                      handleLeaveRequest(leaveRequest.id, "disapprove")
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className={styles.noData}>
                No Leave Requests
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default LeaveRequest;
