import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './EditRoster.module.scss';
import { EditPositionProps } from '@/lib/models';

function EditPosition({
    onClose,
    id,
    name,
    gradeId,
    type,
    partTimeWage,
    fullTimeWage,
    weekendRestDay,
    restDayPerWeek,
    restDayCountBy,
    grades,
}: EditPositionProps) {

    const [editedName, setEditedName] = useState<string>(name)
    const [editedGradeId, setEditedGradeId] = useState<number | null>(gradeId)
    const [editedType, setEditedType] = useState<string>(type)
    const [editedPartTimeWage, setEditedPartTimeWage] = useState<number>(partTimeWage)
    const [editedFullTimeWage, setEditedFullTimeWage] = useState<number>(fullTimeWage)
    const [editedWeekendRestDay, setEditedWeekendRestDay] = useState<boolean>(weekendRestDay)
    const [editedRestDayPerWeek, setEditedRestDayPerWeek] = useState<number>(restDayPerWeek)
    const [editedRestDayCountBy, setEditedRestDayCountBy] = useState<string>(restDayCountBy)

    useEffect(() => {

        if (editedType === 'Part Time') {
            setEditedFullTimeWage(null)
            setEditedWeekendRestDay(false)
            setEditedRestDayPerWeek(null)
            setEditedRestDayCountBy(null)
        } else if (editedType === 'Full Time') {
            setEditedPartTimeWage(null)
        }
    }, [editedType])

    useEffect(() => {

        if (editedWeekendRestDay) {
            setEditedRestDayPerWeek(null)
            setEditedRestDayCountBy(null)
        }
    }, [editedWeekendRestDay]);

    const handleSave = async () => {

        if (editedType === "Part Time" && (editedPartTimeWage === null || editedPartTimeWage <= 0)) {
            alert("Please enter a valid Part Time Salary.");
            return;
        }

        if (editedType === "Full Time" && (editedFullTimeWage === null || editedFullTimeWage <= 0)) {
            alert("Please enter a valid Full Time Salary.");
            return;
        }

        if (weekendRestDay === false && (restDayPerWeek === null || restDayCountBy === null)) {
            alert("Please choose the Non-fixed Rest day number and count by which day");
            return;
        }

        try {

            const token = localStorage.getItem('token')

            const response = await fetch("/api/admin/updateposition", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id,
                    name: editedName,
                    grade_id: editedGradeId,
                    type: editedType,
                    part_time_hour_wage: editedPartTimeWage,
                    full_time_wage: editedFullTimeWage,
                    weekend_restDay: editedWeekendRestDay,
                    restDay_per_week: editedRestDayPerWeek,
                    restDay_countBy: editedRestDayCountBy,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save the position.");
            }

            const result = await response.json();
            alert(result.message)
            onClose()
            window.location.href = '/branch'
        } catch (error) {
            console.error("Error saving position:", error);
            alert("Error saving position. Please try again.");
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Position</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="positionName">
                        <Form.Label><strong>Name:</strong></Form.Label>
                        <Form.Control
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="positionGrade" className="mt-3">
                        <Form.Label><strong>Grade:</strong></Form.Label>
                        <Form.Control
                            as="select"
                            value={editedGradeId}
                            onChange={(e) => setEditedGradeId(Number(e.target.value))}
                        >
                            {grades && grades.map((grade) => (
                                <option key={grade.id} value={grade.id}>
                                    {grade.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="positionType" className="mt-3">
                        <Form.Label><strong>Type:</strong></Form.Label>
                        <Form.Control
                            as="select"
                            value={editedType}
                            onChange={(e) => setEditedType(e.target.value)}
                        >
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="partTimeWage" className="mt-3">
                        <Form.Label><strong>Part Time Salary (per hour):</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={editedPartTimeWage !== null ? editedPartTimeWage : ""}
                            onChange={(e) => setEditedPartTimeWage(e.target.value === "" ? null : Number(e.target.value))}
                            disabled={editedType === "Full Time"}
                        />
                    </Form.Group>

                    <Form.Group controlId="fullTimeWage" className="mt-3">
                        <Form.Label><strong>Full Time Salary:</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={editedFullTimeWage !== null ? editedFullTimeWage : ""}
                            onChange={(e) => setEditedFullTimeWage(e.target.value === "" ? null : Number(e.target.value))}
                            disabled={editedType === "Part Time"}
                        />
                    </Form.Group>

                    <Form.Group controlId="weekendRestDay" className="mt-3">
                        <Form.Label><strong>Fixed Rest day (weekends and holidays):</strong></Form.Label>
                        <Form.Control
                            as="select"
                            value={editedWeekendRestDay ? 'Yes' : 'No'}
                            onChange={(e) => setEditedWeekendRestDay(e.target.value === 'Yes')}
                            disabled={editedType === "Part Time"}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="restDayPerWeek" className="mt-3">
                        <Form.Label><strong>Non-fixed Rest Day (per week):</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={editedRestDayPerWeek !== null ? editedRestDayPerWeek : ""}
                            onChange={(e) => setEditedRestDayPerWeek(e.target.value === "" ? null : Number(e.target.value))}
                            disabled={editedWeekendRestDay || editedType === "Part Time"}
                        />
                    </Form.Group>

                    <Form.Group controlId="restDayCountBy" className="mt-3">
                        <Form.Label><strong>Non-fixed Rest Day Count By:</strong></Form.Label>
                        <Form.Control
                            as="select"
                            value={editedRestDayCountBy || ""}
                            onChange={(e) => setEditedRestDayCountBy(e.target.value === "" ? null : e.target.value)}
                            disabled={editedWeekendRestDay || editedType === "Part Time"}
                        >
                            <option value="">-- Select Day --</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditPosition;