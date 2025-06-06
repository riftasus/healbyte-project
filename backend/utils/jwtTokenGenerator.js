const jwt = require('jsonwebtoken');

function jwtTokenGenerator(user_id, role_id) {
    const payload = {
        user: {
            id: user_id,
            role : role_id
        }
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
}

module.exports = jwtTokenGenerator;