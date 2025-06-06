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


module.exports = {
        getDoctorProfile
};