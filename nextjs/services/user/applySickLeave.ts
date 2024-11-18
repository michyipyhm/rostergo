const { Pool } = require('pg');

const pool = new Pool({
  // Your database connection configuration
});

exports.fetchShiftSlots = async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `
      SELECT 
        sr.date,
        ss.id AS shift_slot_id,
        ss.start_time,
        ss.end_time,
        ss.title
      FROM 
        shift_requests sr
      JOIN 
        shift_slots ss ON sr.shift_slot_id = ss.id
      WHERE 
        sr.user_id = $1
      ORDER BY 
        sr.date ASC, ss.start_time ASC
    `;

    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No shift slots found for this user' });
    }

    res.status(200).json({
      message: 'Shift slots fetched successfully',
      data: rows
    });
  } catch (error) {
    console.error('Error fetching shift slots:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};