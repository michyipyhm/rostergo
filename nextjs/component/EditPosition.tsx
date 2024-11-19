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
        } else if (editedType === 'Full Time') {
            setEditedPartTimeWage(null)
        }
    }, [editedType])

    useEffect(() => {

        if (editedWeekendRestDay) {
            setEditedRestDayPerWeek(null)
            setEditedRestDayCountBy('')
        }
    }, [editedWeekendRestDay]);

    const handleSave = () => {
        console.log({
            id: id,
            name: editedName,
            gradeId: editedGradeId,
            type: editedType,
            partTimeWage: editedPartTimeWage,
            fullTimeWage: editedFullTimeWage,
            weekendRestDay: editedWeekendRestDay,
            restDayPerWeek: editedRestDayPerWeek,
            restDayCountBy: editedRestDayCountBy,
        })
        onClose()
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
                            value={editedGradeId || ''}
                            onChange={(e) => setEditedGradeId(Number(e.target.value))}
                        >
                            <option value="">-- Select Grade --</option>
                            {/* 暫無內容，可稍後動態填充 */}
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
                            value={editedPartTimeWage}
                            onChange={(e) => setEditedPartTimeWage(Number(e.target.value))}
                            disabled={editedType === 'Full Time'}
                        />
                    </Form.Group>

                    <Form.Group controlId="fullTimeWage" className="mt-3">
                        <Form.Label><strong>Full Time Salary:</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={editedFullTimeWage}
                            onChange={(e) => setEditedFullTimeWage(Number(e.target.value))}
                            disabled={editedType === 'Part Time'}
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
                        <Form.Label><strong>Non-fixed Rest day (per week):</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={editedRestDayPerWeek}
                            onChange={(e) => setEditedRestDayPerWeek(Number(e.target.value))}
                            disabled={editedWeekendRestDay}
                        />
                    </Form.Group>

                    <Form.Group controlId="restDayCountBy" className="mt-3">
                        <Form.Label><strong>Non-fixed Rest day count by:</strong></Form.Label>
                        <Form.Control
                            as="select"
                            value={editedRestDayCountBy}
                            onChange={(e) => setEditedRestDayCountBy(e.target.value)}
                            disabled={editedWeekendRestDay}
                        >
                            <option value="">-- Select Day --</option>
                            <option value="Sunday">Sunday</option>
                            <option value="Monday">Monday</option>
                            <option value="Monday">Tuesday</option>
                            <option value="Monday">Wednesday</option>
                            <option value="Monday">Thursday</option>
                            <option value="Monday">Friday</option>
                            <option value="Monday">Saturday</option>
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