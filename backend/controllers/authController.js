const supabase = require('../utils/supabaseClient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const { data: users, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email);

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Supabase error' });
    }

    if (!users || users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = users[0];

    // Secure password comparison
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role_id // optional: still including role in token
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        user_id: user.user_id
      }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Add this inside authController.js

const { v4: uuidv4 } = require("uuid");

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
    if (!name || !email || !password || !upazila_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data: existingUsers, error: userCheckError } = await supabase
      .from("user")
      .select("email")
      .eq("email", email);

    if (userCheckError) throw userCheckError;
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const { data: existingLoc, error: locCheckError } = await supabase
      .from("user_location")
      .select("user_location_id")
      .eq("upazila_id", upazila_id)
      .eq("road_no", road_no)
      .eq("postal_code", postal_code);

    if (locCheckError) throw locCheckError;

    let user_location_id;

    if (existingLoc.length > 0) {
      user_location_id = existingLoc[0].user_location_id;
    } else {
      const locationId = uuidv4();
      const { error: insertLocError } = await supabase
        .from("user_location")
        .insert([
          {
            user_location_id: locationId,
            upazila_id,
            road_no,
            postal_code,
          },
        ]);
      if (insertLocError) throw insertLocError;
      user_location_id = locationId;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();
    const { error: insertUserError } = await supabase.from("user").insert([
      {
        user_id: userId,
        name,
        email,
        phone_no: phone,
        password: hashedPassword,
        gender,
        date_of_birth,
        user_location_id,
      },
    ]);

    if (insertUserError) throw insertUserError;

    return res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Registration error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Export both functions
module.exports = {
  loginUser,
  registerUser
};