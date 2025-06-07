const pool = require("../utils/db"); // Adjust path if needed

async function getDoctorProfile(req, res) {
  const doctorId = req.user.id; // JWT payload

  try {
    const result = await pool.query(
      `SELECT u.user_id, u.name, u.email, u.phone_no, d.consultation_fee
                        FROM "user" u
                        JOIN doctor d ON u.user_id = d.user_id
                        WHERE u.user_id = $1`,
      [doctorId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error("Error fetching doctor profile:", error.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function getTopRatedDoctors(req, res) {
  try {
    const result = await pool.query(`
      SELECT * FROM get_top_rated_doctors_with_qualifications()
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No top-rated doctors found" });
    }

    res.json({ doctors: result.rows });
  } catch (error) {
    console.error("Error fetching top-rated doctors:", error.message);
    res.status(500).json({
      error: "Internal server error",
      details: error.message // Include error details for debugging
    });
  }
}

async function searchDoctors(req, res) {
  try {
    const { name, specialty, minFee, maxFee } = req.query;

    const result = await pool.query(
      `SELECT * FROM search_doctors_with_qualifications($1, $2, $3, $4)`,
      [name || null, minFee || null, maxFee || null, specialty || null]
    );

    // const result = await pool.query(baseQuery, values);

    res.json({ doctors: result.rows });
  } catch (err) {
    console.error("Search error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  getDoctorProfile,
  getTopRatedDoctors,
  searchDoctors
};