const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 5000;

const supabaseUrl = 'https://nckycekwhzmdibtjquxv.supabase.co'; // replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ja3ljZWt3aHptZGlidGpxdXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDMxNDksImV4cCI6MjA2Mjg3OTE0OX0.0r1g0OnT7-8XI5RlJHYOfL5Fbfx1vjkQV0PpkbZhvdE';                        // replace this

const supabase = createClient(supabaseUrl, supabaseKey);


app.use(cors());

app.use(express.json());

app.get('/message', (req, res) => {
  res.json({ text: "Hello from backend version 1" });
});


// Get all users
app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('user').select('*');
  console.log('Backend /users data:', data);
  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.json({
    message: "Hello from backend version 1",
    users: data
  });
});


// Get all appointments
app.get('/appointments', async (req, res) => {
  const { data, error } = await supabase.from('appointment').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
