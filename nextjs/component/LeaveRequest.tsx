"use client"
import React from "react";
import styles from './LeaveRequest.module.scss';

import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface LeaveRequest {
    id: number
    user_nickname: string
    leave_type_name: string
    start_date: string
    end_date: string
    slot_title: string
    duration: string
    status: string
    sick_photo_prove: string
    created_at: string
}

interface LeaveRequestProps {
    leaveRequests: LeaveRequest[]
}

function LeaveRequest(props : LeaveRequestProps) {
    const router = useRouter()

    const results = props.leaveRequests

    const formatDate = (isoDate: string): string => {
        const date = new Date(isoDate)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    };

    const formatDateTime = (isoDate: string): string => {
        const date = new Date(isoDate)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const seconds = String(date.getSeconds()).padStart(2, "0")
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    const handleLeaveRequest = async (id: number, status: string) => {

        try {
            const token = localStorage.getItem('token')

            const response = await fetch("/api/admin/handleleaverequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id, status }),
            });

            if (!response.ok) {
                throw new Error("Failed to update leave request")
            }

            const result = await response.json()
            alert(result.message)
            router.refresh()
        } catch (error) {
            console.error("Error updating leave request:", error)
        }
    };

    return (
        <div className={styles.explainCard}>
            <div>Leave List</div>

            <ListGroup>
                <ListGroupItem className={styles.headerRow}>
                    <Row>
                        <Col><strong>Staff</strong></Col>
                        <Col><strong>Leave Type</strong></Col>
                        <Col><strong>Start Date</strong></Col>
                        <Col><strong>End Date</strong></Col>
                        <Col><strong>Shift Slot</strong></Col>
                        <Col><strong>Duration</strong></Col>
                        <Col><strong>Status</strong></Col>
                        <Col><strong>Create Time</strong></Col>
                        <Col><strong>Remark</strong></Col>
                        <Col><strong>Approval</strong></Col>
                    </Row>
                </ListGroupItem>
                {results.length > 0 ? (
                    results.map((leaveRequest) => (
                        <ListGroupItem key={leaveRequest.id}>
                            <Row>
                                <Col>{leaveRequest.user_nickname}</Col>
                                <Col>{leaveRequest.leave_type_name}</Col>
                                <Col>{formatDate(leaveRequest.start_date)}</Col>
                                <Col>{formatDate(leaveRequest.end_date)}</Col>
                                <Col>{leaveRequest.slot_title}</Col>
                                <Col>{leaveRequest.duration}</Col>
                                <Col>{leaveRequest.status}</Col>
                                <Col>{formatDateTime(leaveRequest.created_at)}</Col>
                                <Col>{leaveRequest.sick_photo_prove}</Col>
                                <Col>
                                    <Button variant="success" className={styles.appBtn} onClick={() => handleLeaveRequest(leaveRequest.id, "approve")}>
                                        Approve
                                    </Button>
                                    <Button variant="danger" onClick={() => handleLeaveRequest(leaveRequest.id, "disapprove")}>
                                        Reject
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))
                ) : (
                    <ListGroupItem>
                        <Row>
                            <Col>No Leave Request.</Col>
                        </Row>
                    </ListGroupItem>
                )}
            </ListGroup>
        </div>
    );
}

export default LeaveRequest;