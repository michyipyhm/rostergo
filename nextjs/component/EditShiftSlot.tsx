import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
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

    const handleSave = async () => {

        try {
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
                throw new Error("Failed to update")
            }

            const result = await response.json();
            alert(result.message)
            onClose()
            window.location.href = '/shiftslot'
        } catch (error) {
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
                            onChange={(e) => setEditedShortTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="startTime">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedStartTime}
                            onChange={(e) => setEditedStartTime(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="endTime" className="mt-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedEndTime}
                            onChange={(e) => setEditedEndTime(e.target.value)}
                            placeholder="Enter end time (e.g., 17:00)"
                        />
                    </Form.Group>

                    <Form.Group controlId="workHour" className="mt-3">
                        <Form.Label>Work Hour</Form.Label>
                        <Form.Control
                            type="number"
                            value={editedWorkHour}
                            onChange={(e) => setEditedWorkHour(Number(e.target.value))}
                            placeholder="Enter work hours (e.g., 8)"
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