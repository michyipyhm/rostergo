import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './EditRoster.module.scss';

interface EditLeaveTypeProps {
    onClose: () => void
    id: number
    name: string
    shortName: string
    quota: number
}

function EditLeaveType({ onClose, id, name, shortName, quota }: EditLeaveTypeProps) {

    const [editedLeaveTypeName, setEditedLeaveTypeName] = useState<string>(name)
    const [editedShortName, setEditedShortName] = useState<string>(shortName)
    const [editedQuota, setEditedQuota] = useState<number>(quota)

    const handleSave = async () => {

        try {

            if (!editedLeaveTypeName.trim()) {
                alert('Please enter a valid Shift Slot Title.');
                return;
            }

            if (!editedShortName.trim()) {
                alert('Please enter a valid Short Title.');
                return;
            }

            const token = localStorage.getItem('token')

            const response = await fetch(`/api/admin/updateleavetype`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id,
                    name: editedLeaveTypeName,
                    short_name: editedShortName,
                    quota: editedQuota,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to update LeaveType.")
            }

            const result = await response.json();
            alert(result.message)
            onClose()
            window.location.href = '/shiftslot'
        } catch (error) {
            console.error('Error updating LeaveType:', error)
            alert(error.message || "Error updating LeaveType. Please try again.")
        }
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Leave Type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="leaveTypeName">
                        <Form.Label>Leave Type Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedLeaveTypeName}
                            onChange={(e) => setEditedLeaveTypeName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="leaveTypeShortName">
                        <Form.Label>Leave Type Short Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedShortName}
                            onChange={(e) => {
                                const input = e.target.value.toUpperCase().replace(/[^A-Z]/g, "")
                                setEditedShortName(input.slice(0, 2))
                            }}
                            placeholder="Enter 2 English letters"
                        />
                    </Form.Group>
                    <Form.Group controlId="Quota" className="mt-3">
                        <Form.Label>Annual Leave Quota</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedQuota !== null ? editedQuota : ''}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^\d*$/.test(input)) {
                                    setEditedQuota(input === '' ? null : Number(input));
                                }
                            }}
                            placeholder="Leave blank if not applicable"
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

export default EditLeaveType;