import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './EditRoster.module.scss';

interface EditRosterProps {
    day: number;
    memberId: number;
    nickname: string | null;
    month: string;
    shift: string | null;
    shiftRequest: string | null;
    leaveRequest: string | null;
    onClose: () => void;
    shiftOptions: string[]
}

function EditRoster({ day, memberId, nickname, month, shift, shiftRequest, leaveRequest, onClose, shiftOptions }: EditRosterProps) {
    const [newShift, setNewShift] = useState<string>(shift || "")

    const handleSave = async () => {
        if (!newShift) {
            alert("Please select a shift before saving.")
            return
        }

        try {

            const token = localStorage.getItem('token')

            const response = await fetch("/api/admin/editshift", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: memberId,
                    month,
                    day,
                    shift_slot: newShift,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save the shift.");
            }

            const result = await response.json();
            alert(result.message || "Shift updated successfully.");
            onClose()
        } catch (error) {
            console.error("Error saving shift:", error);
            alert("Error saving shift. Please try again.");
        }
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Roster</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Member ID:</strong> {memberId}</p>
                <p><strong>Nickname:</strong> {nickname}</p>
                <p><strong>Date:</strong> {`${month}-${String(day).padStart(2, "0")}`}</p>
                <Form.Group controlId="shiftSelect">
                    <Form.Label><strong>Current Shift: {shift}</strong></Form.Label>
                    <Form.Control
                        as="select"
                        value={newShift}
                        onChange={(e) => setNewShift(e.target.value)}
                    >
                        <option value="">Select a shift for change</option>
                        {shiftOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <br></br>
                <p><strong>Shift Request:</strong> {shiftRequest || ""}</p>
                <p><strong>Leave Request:</strong> {leaveRequest || ""}</p>
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

export default EditRoster;