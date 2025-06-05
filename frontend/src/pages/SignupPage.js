import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [roadNo, setRoadNo] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(function () {
    fetch("http://localhost:5000/locations/divisions")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setDivisions(data);
      })
      .catch(function (err) {
        console.error("Error loading divisions", err);
      });
  }, []);

  function handleDivisionChange(event) {
    var divisionId = event.target.value;
    setSelectedDivision(divisionId);
    setSelectedDistrict("");
    setSelectedUpazila("");
    setDistricts([]);
    setUpazilas([]);

    fetch("http://localhost:5000/locations/districts/" + divisionId)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setDistricts(data);
      });
  }

function handleDistrictChange(event) {
  var districtId = event.target.value;
  setSelectedDistrict(districtId);
  setSelectedUpazila("");
  setUpazilas([]);

  fetch("http://localhost:5000/locations/upazilas/" + districtId)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("Fetched upazilas:", data); // ✅ Log here
      if (Array.isArray(data)) {
        setUpazilas(data);
      } else {
        setUpazilas([]); // fallback if bad data
      }
    })
    .catch(function (err) {
      console.error("Upazila fetch error", err);
      setUpazilas([]);
    });
}


  function handleSubmit(event) {
    event.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !selectedDivision ||
      !selectedDistrict ||
      !selectedUpazila
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    var userData = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      gender: gender,
      date_of_birth: dateOfBirth,
      upazila_id: selectedUpazila,
      road_no: roadNo,
      postal_code: postalCode,
    };

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { status: res.status, body: data };
        });
      })
      .then(function (response) {
        if (response.status === 200) {
          setMessage("Signup successful!");
          navigate("/login");
        } else {
          setMessage(response.body.error || "Signup failed.");
        }
      })
      .catch(function (err) {
        console.error("Signup error", err);
        setMessage("Server error");
      });
  }

  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={function (e) {
            setName(e.target.value);
          }}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={function (e) {
            setEmail(e.target.value);
          }}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={function (e) {
            setPhone(e.target.value);
          }}
        />
        <br />
        <input
          type="date"
          value={dateOfBirth}
          onChange={function (e) {
            setDateOfBirth(e.target.value);
          }}
        />
        <br />

        <select
          value={gender}
          onChange={function (e) {
            setGender(e.target.value);
          }}
        >
          <option value="">Select Gender (optional)</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />

        <select value={selectedDivision} onChange={handleDivisionChange} required>
          <option value="">Select Division</option>
          {divisions.map(function (div) {
            return (
              <option key={div.division_id} value={div.division_id}>
                {div.name}
              </option>
            );
          })}
        </select>
        <br />

        <select value={selectedDistrict} onChange={handleDistrictChange} required>
          <option value="">Select District</option>
          {districts.map(function (dist) {
            return (
              <option key={dist.district_id} value={dist.district_id}>
                {dist.name}
              </option>
            );
          })}
        </select>
        <br />

        <select
          value={selectedUpazila}
          onChange={function (e) {
            setSelectedUpazila(e.target.value);
          }}
          required
        >
          <option value="">Select Upazila</option>
          {upazilas.map(function (upz) {
            return (
              <option key={upz.upazila_id} value={upz.upazila_id}>
                {upz.name}
              </option>
            );
          })}
        </select>
        <br />

        <input
          type="text"
          placeholder="Road No"
          value={roadNo}
          onChange={function (e) {
            setRoadNo(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={function (e) {
            setPostalCode(e.target.value);
          }}
        />
        <br />

        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
