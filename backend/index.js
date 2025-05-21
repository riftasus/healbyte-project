const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

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
  console.log(`Backend running on port ${port}`);
});
