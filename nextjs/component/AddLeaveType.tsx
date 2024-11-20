import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './EditRoster.module.scss';

interface AddLeaveTypeProps {
    onClose: () => void
}

function EditLeaveType({ onClose }: AddLeaveTypeProps) {

    const [editedLeaveTypeName, setEditedLeaveTypeName] = useState<string>('');
    const [editedShortName, setEditedShortName] = useState<string>('');
    const [editedQuota, setEditedQuota] = useState<number>(null);

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

            const response = await fetch(`/api/admin/addleavetype`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editedLeaveTypeName,
                    short_name: editedShortName,
                    quota: editedQuota,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to add LeaveType.")
            }

            const result = await response.json();
            alert(result.message)
            onClose()
            window.location.href = '/shiftslot'
        } catch (error) {
            console.error('Error adding LeaveType:', error)
            alert(error.message || "Error adding LeaveType. Please try again.")
        }
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Leave Type</Modal.Title>
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