const pool = require("../utils/db"); // Adjust path if needed

async function getDeliverymanProfile(req, res) {
        const DeliverymanId = req.user.id; // JWT payload

        try {
                const result = await pool.query(
                        `SELECT u.user_id, u.name, u.email, u.phone_no, d.hire_date,
                        d.salary
                        FROM "user" u
                        JOIN deliveryman d ON u.user_id = d.user_id
                        WHERE u.user_id = $1`,
                        [DeliverymanId]
                );

                if (result.rows.length === 0) {
                        return res.status(404).json({ error: "Deliveryman not found" });
                }

                res.status(200).json(result.rows[0]);

        } catch (error) {
                console.error("Error fetching deliveryman profile:", error.message);
                res.status(500).json({ error: "Server error" });
        }
}


module.exports = {
        getDeliverymanProfile
};