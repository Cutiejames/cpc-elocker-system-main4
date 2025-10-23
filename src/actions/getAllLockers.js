const connection = require('../database/connection');

const getAllLockers = async (req, res) => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM lockers ORDER BY locker_id ASC'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching lockers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getAllLockers;