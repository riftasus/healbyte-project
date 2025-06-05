require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// const supabase = require('./utils/supabaseClient'); // use centralized client

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const locationRoutes = require('./routes/locationRoutes');
app.use('/locations', locationRoutes);


app.use(authRoutes);
app.use(userRoutes);
app.use(appointmentRoutes);


app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
