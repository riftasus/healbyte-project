const pool = require("../utils/db"); // Adjust path if needed

async function getCoordinatorProfile(req, res) {
        const CoordinatorId = req.user.id; // JWT payload

        try {
                const result = await pool.query(
                        `SELECT u.user_id, u.name, u.email, u.phone_no, c.hire_date,
                        c.salary
                        FROM "user" u
                        JOIN coordinator c ON u.user_id = c.user_id
                        WHERE u.user_id = $1`,
                        [CoordinatorId]
                );

                if (result.rows.length === 0) {
                        return res.status(404).json({ error: "Coordinator not found" });
                }

                res.status(200).json(result.rows[0]);

        } catch (error) {
                console.error("Error fetching coordinator profile:", error.message);
                res.status(500).json({ error: "Server error" });
        }
}


module.exports = {
        getCoordinatorProfile
};