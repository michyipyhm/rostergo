import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useRouter } from "next/navigation"

interface ChangePasswordModalProps {
  show: boolean;
  onHide: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ show, onHide }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter ()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword != confirmPassword) {
      setError('passwords do not match')
      return
    }
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch ('/api/auth/changePassword', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (response.ok) {
        setSuccess('Password changed successfully');
        localStorage.removeItem('token'); // Remove the token after password change
        setTimeout(() => {
          onHide();
        }, 2000);
        router.push('/login')
      } else {
        const data = await response.json()
        throw new Error(data.message || 'Failed to change password')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }
  
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">          
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Change Password
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;