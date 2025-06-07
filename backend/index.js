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
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const conductorRoutes = require('./routes/conductorRoutes');
const coordinatorRoutes = require('./routes/coordinatorRoutes');
const deliverymanRoutes = require('./routes/deliverymanRoutes');
// const apiRoutes = require('./routes/apiRoutes'); // Centralized API routes
app.use('/doctor', doctorRoutes); // 👈 this makes /doctor/profile work
app.use('/locations', locationRoutes);
app.use('/patient', patientRoutes);
app.use('/conductor', conductorRoutes);
app.use('/coordinator', coordinatorRoutes);
app.use('/deliveryman', deliverymanRoutes);
// app.use('/api', apiRoutes); // Centralized API routes


app.use(authRoutes);
app.use(userRoutes);
app.use(appointmentRoutes);


app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
