const pool = require('../utils/db'); // PG pool

async function getAllUsers(req, res) {
        try {
                const result = await pool.query(`SELECT * FROM "user"`);

                res.json({
                        message: "Hello from backend version 1",
                        users: result.rows
                });
        } catch (error) {
                console.error('PostgreSQL error:', error.message);
                res.status(500).json({ error: "Internal server error" });
        }
}

module.exports = {
        getAllUsers
};
