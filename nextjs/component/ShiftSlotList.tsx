"use client";
import React, { useEffect, useState } from "react";
import styles from './PositionList.module.scss';
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { useRouter } from "next/navigation";
import EditShiftSlot from "./EditShiftSlot";
import EditLeaveType from "./EditLeaveType";
import AddGrade from "./AddGrade";
import AddLeaveType from "./AddLeaveType";
import AddShiftSlot from "./AddShiftSlot";

function ShiftSlotList() {

    const [shiftSlotData, setShiftSlotData] = useState([]);
    const [leaveTypeData, setLeaveTypeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showEditShiftSlot, setShowEditShiftSlot] = useState(false);
    const [showEditLeaveType, setShowEditLeaveType] = useState(false);
    const [showAddShiftSlot, setShowAddShiftSlot] = useState(false);
    const [showAddLeaveType, setShowAddLeaveType] = useState(false);
    const [currentShiftSlot, setCurrentShiftSlot] = useState<any | null>(null);
    const [currentLeaveType, setCurrentLeaveType] = useState<any | null>(null);

    useEffect(() => {
        const fetchShiftSlotData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token has been found.");
                }

                const response = await fetch(`/api/admin/getshiftslot`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch shift slot data: ${response.status} ${response.statusText}`
                    );
                }

                const result = await response.json()
                setShiftSlotData(result.shiftSlots)
                setLeaveTypeData(result.leaveTypes)
            } catch (err: any) {
                console.error("Error fetching shift data:", err.message)
                setError(err.message || "Failed to fetch shift data.")
            } finally {
                setLoading(false);
            }
        };

        fetchShiftSlotData();
    }, []);

    if (loading) {
        return <div>Loading shift slot data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleAddShiftSlot = () => setShowAddShiftSlot(true);
    const handleAddLeaveType = () => setShowAddLeaveType(true);

    const handleEditShiftSlot = (shiftSlot: any) => {
        setCurrentShiftSlot(shiftSlot);
        setShowEditShiftSlot(true);
    };

    const handleEditLeaveType = (leaveType: any) => {
        setCurrentLeaveType(leaveType);
        setShowEditLeaveType(true);
    };

    const closeWindow = () => {
        setShowEditShiftSlot(false);
        setShowEditLeaveType(false);
        setShowAddShiftSlot(false);
        setShowAddLeaveType(false);
        setCurrentShiftSlot(null);
        setCurrentLeaveType(null);
    };

    return (
        <div>
            <div className={styles.positionList}>
                <div className={styles.titleAddBtn}>
                    <h2>Shift Slot List</h2>
                    <Button
                        variant="primary"
                        className={styles.addNewBtn}
                        onClick={handleAddShiftSlot}
                    >
                        Add New
                    </Button>
                </div>
                <ListGroup>
                    <ListGroupItem className={styles.headerRow}>
                        <Row>
                            <Col><strong>Title</strong></Col>
                            <Col><strong>Short Title</strong></Col>
                            <Col><strong>Start Time</strong></Col>
                            <Col><strong>End Time</strong></Col>
                            <Col><strong>Work Hour</strong></Col>
                            <Col><strong>Action</strong></Col>
                        </Row>
                    </ListGroupItem>
                    {shiftSlotData.length > 0 ? (
                        shiftSlotData.map((shiftSlot: any) => (
                            <ListGroupItem key={shiftSlot.id}>
                                <Row>
                                    <Col>{shiftSlot.title}</Col>
                                    <Col>{shiftSlot.short_title}</Col>
                                    <Col>{shiftSlot.start_time}</Col>
                                    <Col>{shiftSlot.end_time}</Col>
                                    <Col>{shiftSlot.work_hour}</Col>
                                    <Col>
                                        <Button
                                            variant="outline-success"
                                            className={styles.appBtn}
                                            onClick={() => handleEditShiftSlot(shiftSlot)}
                                        >
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))
                    ) : (
                        <div>No Shift Slot data found.</div>
                    )}
                </ListGroup>
            </div>

            <div className={styles.positionList}>
                <div className={styles.titleAddBtn}>
                    <h2>Leave Type List</h2>
                    <Button
                        variant="primary"
                        className={styles.addNewBtn}
                        onClick={handleAddLeaveType}
                    >
                        Add New
                    </Button>
                </div>
                <ListGroup>
                    <ListGroupItem className={styles.headerRow}>
                        <Row>
                            <Col><strong>Name</strong></Col>
                            <Col><strong>Short Name</strong></Col>
                            <Col><strong>Quota</strong></Col>
                            <Col><strong>Action</strong></Col>
                        </Row>
                    </ListGroupItem>
                    {leaveTypeData.length > 0 ? (
                        leaveTypeData.map((leaveType: any) => (
                            <ListGroupItem key={leaveType.id}>
                                <Row>
                                    <Col>{leaveType.name}</Col>
                                    <Col>{leaveType.short_name}</Col>
                                    <Col>{leaveType.quota}</Col>
                                    <Col>
                                        <Button
                                            variant="outline-success"
                                            className={styles.appBtn}
                                            onClick={() => handleEditLeaveType(leaveType)}
                                        >
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))
                    ) : (
                        <div>No Leave Type data found.</div>
                    )}

                    {showEditShiftSlot && currentShiftSlot ? (
                        <EditShiftSlot
                            onClose={closeWindow}
                            id={currentShiftSlot.id}
                            title={currentShiftSlot.title}
                            shortTitle={currentShiftSlot.short_title}
                            startTime={currentShiftSlot.start_time}
                            endTime={currentShiftSlot.end_time}
                            workHour={currentShiftSlot.work_hour}
                        />
                    ) : null}
                    {showEditLeaveType && currentLeaveType ? (
                        <EditLeaveType
                            onClose={closeWindow}
                            id={currentLeaveType.id}
                            name={currentLeaveType.name}
                            shortName={currentLeaveType.short_name}
                            quota={currentLeaveType.quota}
                        />
                    ) : null}
                    {showAddShiftSlot ? (
                        <AddShiftSlot onClose={closeWindow} />
                    ) : null}
                    {showAddLeaveType ? (
                        <AddLeaveType onClose={closeWindow} />
                    ) : null}

                </ListGroup>
            </div>
        </div>
    )

}


export default ShiftSlotList;