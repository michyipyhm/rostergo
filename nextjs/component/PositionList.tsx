"use client";
import React, { useEffect, useState } from "react";
import styles from './PositionList.module.scss';
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import EditGrade from "./EditGrade";
import EditPosition from "./EditPosition";
import { useRouter } from "next/navigation";
import { EditPositionProps, GradeData, PositionData } from '@/lib/models';

function PositionList() {
    const router = useRouter()

    const [positionData, setPositionData] = useState<PositionData[] | null>(null);
    const [grades, setGrades] = useState<GradeData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [showEditPosition, setShowEditPosition] = useState(false)
    const [showEditGrade, setShowEditGrade] = useState(false)
    const [currentGrade, setCurrentGrade] = useState<{ grade_id: number, grade_name: string, annual_leave_quota: number } | null>(null)
    const [currentPosition, setCurrentPosition] = useState<EditPositionProps | null>(null)

    useEffect(() => {
        const fetchPositionData = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    throw new Error("No token has been found.");
                }

                const response = await fetch(`/api/admin/getposition`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch position data: ${response.status} ${response.statusText}`
                    );
                }

                const result = await response.json()
                const data: PositionData[] = result.positions
                setPositionData(data)
                setGrades(result.grades)
            } catch (err: any) {
                console.error("Error fetching position data:", err.message);
                setError(err.message || "Failed to fetch position data.");
            } finally {
                setLoading(false);
            }
        };

        fetchPositionData();
    }, []);

    if (loading) {
        return <div>Loading position data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleEditPosition = (position: PositionData) => {
        setCurrentPosition({
            onClose: closeEdit,
            id: position.id,
            name: position.name,
            gradeId: position.grade_id,
            gradeName: position.grade_name,
            type: position.type,
            partTimeWage: position.part_time_hour_wage,
            fullTimeWage: position.full_time_wage,
            weekendRestDay: position.weekend_restDay,
            restDayPerWeek: position.restDay_per_week,
            restDayCountBy: position.restDay_countBy,
            grades: grades,
        })
        setShowEditPosition(true)
    }

    const handleEditGrade = (grade: { grade_id: number, grade_name: string, annual_leave_quota: number }) => {
        setCurrentGrade(grade)
        setShowEditGrade(true)
    }

    const closeEdit = () => {
        setShowEditPosition(false)
        setShowEditGrade(false)
        setCurrentGrade(null)
        setCurrentPosition(null)
        router.refresh()
    }

    return (
        <div>
            <div><h1>Grade</h1></div>
            <ListGroupItem className={styles.headerRow}>
                <Row>
                    <Col><strong>Name</strong></Col>
                    <Col><strong>Annual Leave Quota</strong></Col>
                    <Col><strong>Action</strong></Col>
                </Row>
            </ListGroupItem>
            {positionData ? (
                positionData.map((position) => (
                    <ListGroupItem key={position.grade_id}>
                        <Row>
                            <Col>{position.grade_name}</Col>
                            <Col>{position.annual_leave_quota}</Col>
                            <Col>
                                <Button
                                    variant="outline-success"
                                    className={styles.appBtn}
                                    onClick={() => handleEditGrade({
                                        grade_id: position.grade_id,
                                        grade_name: position.grade_name,
                                        annual_leave_quota: position.annual_leave_quota
                                    })}
                                >
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))
            ) : (
                <div>No grade data found.</div>
            )
            }

            <div><h1>Positions</h1></div>
            <ListGroupItem className={styles.headerRow}>
                <Row>
                    <Col><strong>Name</strong></Col>
                    <Col><strong>Grade</strong></Col>
                    <Col><strong>Type</strong></Col>
                    <Col><strong>Part Time Salary<br />(per hour)</strong></Col>
                    <Col><strong>Full Time Salary</strong></Col>
                    <Col><strong>Fixed Rest day<br />(Weekends and Holidays)</strong></Col>
                    <Col><strong>Non-fixed Rest day number<br />(per week)</strong></Col>
                    <Col><strong>Non-fixed Rest day count by</strong></Col>
                    <Col><strong>Action</strong></Col>
                </Row>
            </ListGroupItem>
            {positionData ? (
                positionData.map((position) => (
                    <ListGroupItem key={position.id}>
                        <Row>
                            <Col>{position.name}</Col>
                            <Col>{position.grade_name}</Col>
                            <Col>{position.type}</Col>
                            <Col>{position.part_time_hour_wage != null ? `$${position.part_time_hour_wage}` : "N/A"}</Col>
                            <Col>{position.full_time_wage != null ? `$${position.full_time_wage}` : "N/A"}</Col>
                            <Col>{position.weekend_restDay ? "Yes" : "No"}</Col>
                            <Col>{position.restDay_per_week != null ? position.restDay_per_week : "N/A"}</Col>
                            <Col>{position.restDay_countBy != null ? position.restDay_countBy : "N/A"}</Col>
                            <Col>
                                <Button
                                    variant="outline-success"
                                    className={styles.appBtn}
                                    onClick={() => handleEditPosition(position)}
                                >
                                    Edit
                                </Button>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))
            ) : (
                <div>No position data found.</div>
            )}
            {showEditPosition && currentPosition ? (
                <EditPosition {...currentPosition} />
            ) : null}
            {showEditGrade && currentGrade ? (
                <EditGrade
                    onClose={closeEdit}
                    id={currentGrade.grade_id}
                    name={currentGrade.grade_name}
                    annualLeaveQuota={currentGrade.annual_leave_quota}
                />
            ) : null}

        </div>
    );
}

export default PositionList;