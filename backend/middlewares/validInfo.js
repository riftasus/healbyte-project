function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/i.test(email);
}


function checkValidity (req, res, next) {
    // Adjust the fields for your own registration form
    const { email, password, name, phone, date_of_birth, gender, upazila_id } = req.body;

    if (req.path === "/register") {
        // Add other required fields as needed!
        if (![email, name, password, phone, date_of_birth, gender, upazila_id].every(Boolean)) {
            return res.status(401).json({ error: "Missing Credentials" });
        } else if (!validEmail(email)) {
            return res.status(401).json({ error: "Invalid Email" });
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json({ error: "Missing Credentials" });
        } else if (!validEmail(email)) {
            return res.status(401).json({ error: "Invalid Email" });
        }
    }

    next();
};

module.exports = {checkValidity};