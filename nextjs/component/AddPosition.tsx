import React, { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { GradeData } from '@/lib/models';

interface AddPositionProps {
    onClose: () => void
    grades: GradeData[]
}

function AddPosition({ onClose, grades }: AddPositionProps) {

    const [editedName, setEditedName] = useState<string>('');
    const [editedGradeId, setEditedGradeId] = useState<number | ''>('');
    const [editedType, setEditedType] = useState<string>('Full Time');
    const [editedPartTimeWage, setEditedPartTimeWage] = useState<number | ''>('');
    const [editedFullTimeWage, setEditedFullTimeWage] = useState<number | ''>('');
    const [editedWeekendRestDay, setEditedWeekendRestDay] = useState<boolean>(false);
    const [editedRestDayPerWeek, setEditedRestDayPerWeek] = useState<number | ''>('');
    const [editedRestDayCountBy, setEditedRestDayCountBy] = useState<string | ''>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSave = async () => {

        if (!editedName) {
            alert('Please enter a position name.');
            return;
        }
        if (!editedGradeId) {
            alert('Please select a grade.');
            return;
        }
        if (editedType === 'Part Time' && (editedPartTimeWage === '' || editedPartTimeWage <= 0)) {
            alert('Please enter a valid Part Time Salary.');
            return;
        }
        if (editedType === 'Full Time' && (editedFullTimeWage === '' || editedFullTimeWage <= 0)) {
            alert('Please enter a valid Full Time Salary.');
            return;
        }
        if (!editedWeekendRestDay && (editedRestDayPerWeek === '' || !editedRestDayCountBy)) {
            alert('Please specify the Non-fixed Rest Day details.');
            return;
        }

        try {
            setLoading(true)

            const token = localStorage.getItem('token')

            const print = {
                name: editedName,
                grade_id: editedGradeId,
                type: editedType,
                part_time_hour_wage: editedPartTimeWage || null,
                full_time_wage: editedFullTimeWage || null,
                weekend_restDay: editedWeekendRestDay,
                restDay_per_week: editedRestDayPerWeek || null,
                restDay_countBy: editedRestDayCountBy || null,
            }

            console.log(print)

            const response = await fetch("/api/admin/addposition", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editedName,
                    grade_id: editedGradeId,
                    type: editedType,
                    part_time_hour_wage: editedPartTimeWage || null,
                    full_time_wage: editedFullTimeWage || null,
                    weekend_restDay: editedWeekendRestDay,
                    restDay_per_week: editedRestDayPerWeek || null,
                    restDay_countBy: editedRestDayCountBy || null,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add new position.")
            }

            const result = await response.json()
            alert(result.message)
            onClose()
            window.location.href = '/branch'
        } catch (error) {
            console.error("Error adding position:", error)
            alert("Error adding position. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Position</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="positionName">
                        <Form.Label><strong>Name:</strong></Form.Label>
                        <Form.Control
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            placeholder="Enter position name"
                        />
                    </Form.Group>

                    <Form.Group controlId="positionGrade" className="mt-3">
                        <Form.Label><strong>Grade:</strong></Form.Label>
                        <Form.Control
                            as="select"
                            value={editedGradeId}
                            onChange={(e) => setEditedGradeId(Number(e.target.value))}
                        >
                            <option value="">-- Select Grade --</option>
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
                            value={editedPartTimeWage !== null ? editedPartTimeWage : ''}
                            onChange={(e) => setEditedPartTimeWage(e.target.value === '' ? null : Number(e.target.value))}
                            disabled={editedType === "Full Time"}
                        />
                    </Form.Group>

                    <Form.Group controlId="fullTimeWage" className="mt-3">
                        <Form.Label><strong>Full Time Salary:</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={editedFullTimeWage !== null ? editedFullTimeWage : ''}
                            onChange={(e) => setEditedFullTimeWage(e.target.value === '' ? null : Number(e.target.value))}
                            disabled={editedType === "Part Time"}
                        />
                    </Form.Group>

                    <Form.Group controlId="weekendRestDay" className="mt-3">
                        <Form.Label><strong>Fixed Rest day (weekends and holidays):</strong></Form.Label>
                        <Form.Control
                            as="select"
                            value={editedWeekendRestDay ? 'Yes' : 'No'}
                            onChange={(e) => setEditedWeekendRestDay(e.target.value === 'Yes')}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="restDayPerWeek" className="mt-3">
                        <Form.Label><strong>Non-fixed Rest Day (per week):</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={editedRestDayPerWeek !== null ? editedRestDayPerWeek : ''}
                            onChange={(e) => setEditedRestDayPerWeek(e.target.value === '' ? null : Number(e.target.value))}
                            disabled={editedWeekendRestDay}
                        />
                    </Form.Group>

                    <Form.Group controlId="restDayCountBy" className="mt-3">
                        <Form.Label><strong>Non-fixed Rest Day Count By:</strong></Form.Label>
                        <Form.Control
                            as="select"
                            value={editedRestDayCountBy || ''}
                            onChange={(e) => setEditedRestDayCountBy(e.target.value || null)}
                            disabled={editedWeekendRestDay}
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
                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
                </Button>
                <Button variant="secondary" onClick={onClose} disabled={loading}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddPosition;