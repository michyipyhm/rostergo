import React from 'react';
import { Button } from 'react-bootstrap';

type EditRosterProps = {
    day: number;
    memberName: string;
    onClose: () => void;
}

const EditRoster: React.FC<EditRosterProps> = ({ day, memberName, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'Blue',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
        }}>
            <p>Hi {memberName}, This is {day}</p>
            <Button onClick={onClose}>Close</Button>
        </div>
    );
};

export default EditRoster;