// controllers/appointmentController.js
const pool = require('../utils/db'); // PG pool

// const supabase = require('../utils/supabaseClient');

async function getAllAppointments(req, res) {
        try {
                const result = await pool.query(`SELECT * FROM "appointment"`);

                res.json({appointments: result.rows});

        }
        catch (error) {
                console.log("Postgresql error: ", error.message);

                res.status(500).json({ error: "Internal server error" });
        };



};

module.exports = { getAllAppointments };
