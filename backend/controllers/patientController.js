const pool = require("../utils/db"); // Adjust path if needed

async function getPatientProfile(req, res) {
        const PatientId = req.user.id; // JWT payload

        try {
                const result = await pool.query(
                        `SELECT u.user_id, u.name, u.email, u.phone_no, p.allergies,p.blood_type
                        FROM "user" u
                        JOIN patient p ON u.user_id = p.user_id
                        WHERE u.user_id = $1`,
                        [PatientId]
                );

                if (result.rows.length === 0) {
                        return res.status(404).json({ error: "Patient not found" });
                }

                res.status(200).json(result.rows[0]);

        } catch (error) {
                console.error("Error fetching patient profile:", error.message);
                res.status(500).json({ error: "Server error" });
        }
}


module.exports = {
        getPatientProfile
};