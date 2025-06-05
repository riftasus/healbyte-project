// controllers/appointmentController.js
const supabase = require('../utils/supabaseClient');

async function getAllAppointments(req, res) {
        const { data, error } = await supabase.from('appointment').select('*');

        if (error) {
                console.log('Supabase error:', error);
                res.status(500).json({ error: error.message });
                return;
        }
        res.json(data);
};

module.exports = { getAllAppointments };
