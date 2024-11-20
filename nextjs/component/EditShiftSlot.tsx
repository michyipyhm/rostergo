import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import styles from './EditRoster.module.scss';

interface EditShiftProps {
    onClose: () => void
    id: number
    title: string
    shortTitle: string
    startTime: string
    endTime: string
    workHour: number
}

function EditShiftSlot({ onClose, id, title, shortTitle, startTime, endTime, workHour }: EditShiftProps) {

    const [editedTitle, setEditedTitle] = useState<string>(title);
    const [editedShortTitle, setEditedShortTitle] = useState<string>(shortTitle);
    const [editedStartTime, setEditedStartTime] = useState<string>(startTime);
    const [editedEndTime, setEditedEndTime] = useState<string>(endTime);
    const [editedWorkHour, setEditedWorkHour] = useState<number>(workHour);
    const [editedStartHour, setEditedStartHour] = useState("");
    const [editedStartMinute, setEditedStartMinute] = useState("");
    const [editedEndHour, setEditedEndHour] = useState("");
    const [editedEndMinute, setEditedEndMinute] = useState("");

    const generateHours = () => {
        const hours = [];
        for (let hour = 0; hour < 24; hour++) {
            hours.push(hour.toString().padStart(2, "0"))
        }
        return hours;
    };
    const generateMinutes = () => {
        return ["00", "15", "30", "45"];
    };

    const timeToSeconds = (time: string): number => {
        const [hours, minutes, seconds] = time.split(':').map(Number)
        return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0)
    }

    useEffect(() => {
        if (editedStartTime && editedEndTime) {
            const startSeconds = timeToSeconds(editedStartTime)
            const endSeconds = timeToSeconds(editedEndTime)

            const workSeconds = endSeconds >= startSeconds
                ? endSeconds - startSeconds
                : 24 * 3600 - startSeconds + endSeconds

            setEditedWorkHour(workSeconds / 3600)
        }
    }, [editedStartTime, editedEndTime])

    useEffect(() => {
        if (editedStartHour !== "" && editedStartMinute !== "") {
            setEditedStartTime(`${editedStartHour}:${editedStartMinute}:00`);
        }
    }, [editedStartHour, editedStartMinute]);

    useEffect(() => {
        if (editedEndHour !== "" && editedEndMinute !== "") {
            setEditedEndTime(`${editedEndHour}:${editedEndMinute}:00`);
        }
    }, [editedEndHour, editedEndMinute]);

    const handleSave = async () => {

        try {

            if (!editedTitle.trim()) {
                alert('Please enter a valid Shift Slot Title.');
                return;
            }

            if (!editedShortTitle.trim()) {
                alert('Please enter a valid Short Title.');
                return;
            }

            const token = localStorage.getItem('token')

            const response = await fetch(`/api/admin/updateshiftslot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id,
                    title: editedTitle,
                    short_title: editedShortTitle,
                    start_time: editedStartTime,
                    end_time: editedEndTime,
                    work_hour: editedWorkHour,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to update shift slot.")
            }

            const result = await response.json();
            alert(result.message)
            onClose()
            window.location.href = '/shiftslot'
        } catch (error) {
            alert(error.message || "Error adding shift slot. Please try again.")
            console.error('Error updating shift slot:', error)
        }
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Shift Slot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="shiftSlotName">
                        <Form.Label>Shift Slot Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="Enter shift slot title"
                        />
                    </Form.Group>

                    <Form.Group controlId="shortTitle">
                        <Form.Label>Short Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedShortTitle}
                            onChange={(e) => {
                                const input = e.target.value.toUpperCase().replace(/[^A-Z]/g, "")
                                if (input.length <= 2) {
                                    setEditedShortTitle(input);
                                } else {
                                    alert("Short Title must be exactly 2 English letters.");
                                }
                            }}
                            placeholder="Enter 2 letter English only"
                        />
                    </Form.Group>

                    <Form.Group controlId="startTime" className="mt-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedStartTime}
                            readOnly
                        />
                        <Row className="mt-2">
                            <Col>
                                <Form.Control
                                    as="select"
                                    value={editedStartHour}
                                    onChange={(e) => setEditedStartHour(e.target.value)}
                                >
                                    <option value="">Hour</option>
                                    {generateHours().map((hour) => (
                                        <option key={hour} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control
                                    as="select"
                                    value={editedStartMinute}
                                    onChange={(e) => setEditedStartMinute(e.target.value)}
                                >
                                    <option value="">Minute</option>
                                    {generateMinutes().map((minute) => (
                                        <option key={minute} value={minute}>
                                            {minute}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="endTime" className="mt-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedEndTime}
                            readOnly
                        />
                        <Row className="mt-2">
                            <Col>
                                <Form.Control
                                    as="select"
                                    value={editedEndHour}
                                    onChange={(e) => setEditedEndHour(e.target.value)}
                                >
                                    <option value="">Hour</option>
                                    {generateHours().map((hour) => (
                                        <option key={hour} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control
                                    as="select"
                                    value={editedEndMinute}
                                    onChange={(e) => setEditedEndMinute(e.target.value)}
                                >
                                    <option value="">Minute</option>
                                    {generateMinutes().map((minute) => (
                                        <option key={minute} value={minute}>
                                            {minute}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group controlId="workHour" className="mt-3">
                        <Form.Label>Work Hour</Form.Label>
                        <Form.Control
                            type="number"
                            value={editedWorkHour}
                            onChange={(e) => setEditedWorkHour(Number(e.target.value))}
                            placeholder="Enter work hours (e.g., 8)"
                            readOnly
                        />
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
    )
}

export default EditShiftSlot;