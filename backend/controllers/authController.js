// const supabase = require('../utils/supabaseClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../utils/db'); // PG pool
const jwtTokenGenerator = require('../utils/jwtTokenGenerator');


async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const checkQuery = `SELECT * FROM "user" WHERE email = $1`;
    const result = await pool.query(checkQuery, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwtTokenGenerator(user.user_id, user.role_id);

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        role_id: user.role_id,
      }
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


// const { v4: uuidv4 } = require("uuid");

async function registerUser(req, res) {
  const {
    name,
    email,
    password,
    phone,
    gender,
    date_of_birth,
    upazila_id,
    road_no,
    postal_code,
  } = req.body;

  try {
    const checkQuery = `SELECT email FROM "user" WHERE email = $1`;
    const checkResult = await pool.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO "user" (
        user_id, name, email, password, phone_no, gender, date_of_birth, user_location_id,role_id
      )
      VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6,
        get_or_insert_user_location($7, $8, $9),'patient'::role_enum
      )
      RETURNING user_id
    `;

    const insertValues = [
      name,
      email,
      hashedPassword,
      phone,
      gender,
      date_of_birth,
      upazila_id,
      road_no || null,
      postal_code || null
    ];

    const result = await pool.query(insertQuery, insertValues);
    const newUserId = result.rows[0].user_id;

    await pool.query(
      `INSERT INTO patient (user_id) VALUES ($1)`,
      [newUserId]
    );

    const newToken = jwtTokenGenerator(newUserId, 'patient');

    return res.status(200).json({ message: "Signup successful", user_id: newUserId, token: newToken });

  } catch (err) {
    console.error("Registration error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { loginUser, registerUser };