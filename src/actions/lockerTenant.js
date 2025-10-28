const connection = require("../database/connection");

// 🔹 GET tenant info (students with course + locker data for rented + reserved)
const getTenantInfo = async (req, res) => {
  try {
    const query = `
      SELECT 
        u.user_id,
        u.stud_id,
        CONCAT(u.f_name, ' ', LEFT(u.m_name, 1), '. ', u.l_name) AS student_name, -- ✅ Full name
        u.f_name,
        u.m_name,
        u.l_name,
        u.email,
        u.gender,
        c.course_name,
        l.locker_id,
        l.locker_number,
        l.status
      FROM users AS u
      LEFT JOIN courses AS c ON u.course_id = c.course_id
      LEFT JOIN lockers AS l ON l.assigned_to = u.user_id
      WHERE l.status IN ('rented', 'reserved') -- ✅ include both rented and reserved
      ORDER BY u.user_id ASC
    `;

    const [rows] = await connection.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching tenant info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getTenantInfo };
