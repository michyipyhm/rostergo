import React from "react";
import styles from './ShiftSlot.module.scss';
import { monthlyRosterService } from "@/services/admin/monthlyRosterService";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface LeaveRequestProps {
    date: string
}

async function LeaveRequest({ date }: LeaveRequestProps) {

    const data = await monthlyRosterService.getLeaveRequest(date)
    const leaveRequests = data.leave_requests

    return (
        <div className={styles.explainCard}>
            <div>Leave List</div>

            <ListGroup>
            {leaveRequests.map((leaveRequest) => (
                    <ListGroupItem key={leaveRequest.id}>
                        AA, BB
                    </ListGroupItem>
                ))}
                {data.leave_requests.length === 0 && "No Leave Request."}
            </ListGroup>
        </div>
    );
}

export default LeaveRequest;