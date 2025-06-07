const pool = require("../utils/db"); // Adjust path if needed

async function getConductorProfile(req, res) {
        const ConductorId = req.user.id; // JWT payload

        try {
                const result = await pool.query(
                        `SELECT u.user_id, u.name, u.email, u.phone_no, c.salary,c.hire_date
                        FROM "user" u
                        JOIN test_conductor c ON u.user_id = c.user_id
                        WHERE u.user_id = $1`,
                        [ConductorId]
                );

                if (result.rows.length === 0) {
                        return res.status(404).json({ error: "Conductor not found" });
                }

                res.status(200).json(result.rows[0]);

        } catch (error) {
                console.error("Error fetching conductor profile:", error.message);
                res.status(500).json({ error: "Server error" });
        }
}


module.exports = {
        getConductorProfile
};