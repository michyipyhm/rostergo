import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styles from './EditRoster.module.scss';

interface EditShiftProps {
    onClose: () => void
    id: number
    name: string
    annualLeaveQuota: number
}

function EditGrade({ onClose, id, name, annualLeaveQuota }: EditGradeProps) {

    const [editedGradeName, setEditedGradeName] = useState<string>(name)
    const [editedAnnualLeaveQuota, setEditedAnnualLeaveQuota] = useState<number>(annualLeaveQuota)

    const handleSave = async () => {

        try {
            const token = localStorage.getItem('token')

            const response = await fetch(`/api/admin/updategrade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id,
                    name: editedGradeName,
                    annualLeaveQuota: editedAnnualLeaveQuota,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update")
            }

            const result = await response.json();
            alert(result.message)
            onClose()
            window.location.href = '/branch'
        } catch (error) {
            console.error('Error updating grade:', error)
        }
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Grade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="gradeName">
                        <Form.Label>Grade Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedGradeName}
                            onChange={(e) => setEditedGradeName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="annualLeaveQuota" className="mt-3">
                        <Form.Label>Annual Leave Quota</Form.Label>
                        <Form.Control
                            type="number"
                            value={editedAnnualLeaveQuota}
                            onChange={(e) => setEditedAnnualLeaveQuota(Number(e.target.value))}
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

export default EditGrade;