const express = require("express");
const router = express.Router();
const supabase = require("../utils/supabaseClient");

// GET all divisions
router.get("/divisions", async function (req, res) {
  const { data, error } = await supabase.from("division").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET districts by division_id
router.get("/districts/:divisionId", async function (req, res) {
  const divisionId = req.params.divisionId;
  const { data, error } = await supabase
    .from("district")
    .select("*")
    .eq("division_id", divisionId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET upazilas by district_id
router.get("/upazilas/:districtId", async function (req, res) {
  const districtId = req.params.districtId;
  console.log("Incoming districtId:", districtId);

  try {
    const { data, error } = await supabase
      .from("upazila")
      .select("upazila_id, name, district_id") // add district_id to verify match
      .eq("district_id", districtId); // integer, should work

    if (error) {
      console.error("Supabase query error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("Upazilas found:", data.length);
    res.json(data);
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "Server crashed unexpectedly" });
  }
});


module.exports = router;
