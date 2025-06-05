const supabase = require('../utils/supabaseClient');

async function getAllUsers(req, res) {
        const result = await supabase.from('user').select('*');

        const data = result.data;
        const error = result.error;

        if (error) {
                console.log('Supabase error:', error);
                res.status(500).json({ error: error.message });
                return;
        }

        res.json({
                message: "Hello from backend version 1",
                users: data
        });
}
module.exports = {
        getAllUsers: getAllUsers
};
