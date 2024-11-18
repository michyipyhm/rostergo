const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken } = require('../middleware/auth');


const { fetchShiftSlots } = require('@/services/applySickLeave');


router.get('/fetchShiftSlots/:userId', authenticateToken, fetchShiftSlots);

module.exports = router;

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.post('/applySickLeave', authenticateToken, upload.single('proofImage'), async (req, res) => {
  try {
    const { shiftSlot, startDate, endDate, duration } = req.body;
    const userId = req.user.id; // Assuming the user ID is attached to the request by the authenticateToken middleware

    // Validate input
    if (!shiftSlot || !startDate || !endDate || !duration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Here you would typically save the sick leave application to your database
    // For this example, we'll just create a mock response
    const sickLeaveApplication = {
      id: uuidv4(),
      userId,
      shiftSlot,
      startDate,
      endDate,
      duration,
      proofImagePath: req.file ? req.file.path : null,
      status: 'Pending',
      createdAt: new Date(),
    };

    // Save sickLeaveApplication to database (not implemented in this example)
    // await SickLeaveModel.create(sickLeaveApplication);

    res.status(201).json({
      id: sickLeaveApplication.id,
      status: sickLeaveApplication.status,
      message: 'Sick leave application submitted successfully',
    });
  } catch (error) {
    console.error('Error in applySickLeave:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;




