import React from "react";
import styles from './ShiftSlot.module.scss';
import { monthlyRosterService } from "@/services/monthlyRosterService";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface LeaveRequestProps {
    date: string
}

async function LeaveRequest({ date }: LeaveRequestProps) {

    const data = await monthlyRosterService.getLeaveRequest(date)
    const leaveRequest = data.leave_requests

    return (
        <div className={styles.explainCard}>
            <div>Leave List</div>

            <ListGroup>
                {props.todoItems.map((item, idx) => (
                    <ListGroupItem key={item.id}>
                        AA, BB
                    </ListGroupItem>
                ))}
                {props.todoItems.length === 0 && "No todo item."}
            </ListGroup>
        </div>
    );
}

export default LeaveRequest;