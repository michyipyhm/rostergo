import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import styles from './EditRoster.module.scss';

interface AddGradeProps {
    onClose: () => void
}

function AddGrade({ onClose }: AddGradeProps) {

    const [editedGradeName, setEditedGradeName] = useState<string>('')
    const [editedAnnualLeaveQuota, setEditedAnnualLeaveQuota] = useState<number | ''>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSave = async () => {

        if (!editedGradeName || editedAnnualLeaveQuota === '') {
            alert('Please fill in all required fields.');
            return;
        }


        try {
            setLoading(true)
            const token = localStorage.getItem('token')

            const response = await fetch(`/api/admin/addgrade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editedGradeName,
                    annualLeaveQuota: editedAnnualLeaveQuota,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add new grade")
            }

            const result = await response.json();
            alert(result.message)
            onClose()
            window.location.href = '/branch'
        } catch (error) {
            console.error('Error adding new grade:', error)
            alert('Error adding new grade. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Grade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="gradeName">
                        <Form.Label>Grade Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedGradeName}
                            onChange={(e) => setEditedGradeName(e.target.value)}
                            placeholder="Enter grade name"
                        />
                    </Form.Group>
                    <Form.Group controlId="annualLeaveQuota" className="mt-3">
                        <Form.Label>Annual Leave Quota</Form.Label>
                        <Form.Control
                            type="number"
                            value={editedAnnualLeaveQuota}
                            onChange={(e) => setEditedAnnualLeaveQuota(e.target.value === '' ? '' : Number(e.target.value))}
                            placeholder="Enter annual leave quota"
                        />
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

export default AddGrade;