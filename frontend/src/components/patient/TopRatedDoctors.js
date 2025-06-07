import React, { useEffect, useState } from "react";

export default function TopRatedDoctors() {
	const [doctors, setDoctors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [selectedDoctor, setSelectedDoctor] = useState(null);

	useEffect(() => {
		fetch("http://localhost:5000/doctor/top-rated")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch doctors");
				return res.json();
			})
			.then((data) => {
				setDoctors(data.doctors || []);
				setLoading(false);
			})
			.catch((err) => {
				setError(`Could not load doctor list. ${err.message}`);
				setLoading(false);
				console.error("TopRatedDoctors fetch error:", err);
			});
	}, []);

	const handleClosePopup = () => setSelectedDoctor(null);

	const mockSchedule = [
		"Monday: 10:00 AM - 1:00 PM",
		"Tuesday: 2:00 PM - 5:00 PM",
		"Wednesday: 9:00 AM - 12:00 PM",
		"Thursday: 3:00 PM - 6:00 PM",
		"Friday: 11:00 AM - 2:00 PM",
	];

	if (loading) return <p>Loading top rated doctors...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div>
			<h3 style={{ color: "#fff" }}>🌟 Top Rated Doctors</h3>
			<div
				style={{
					maxHeight: "500px",
					overflowY: "scroll",
					paddingRight: "10px",
					border: "1px solid #444",
					borderRadius: "8px",
					backgroundColor: "#1a1a1a",
				}}
			>
				<ul style={{ listStyle: "none", padding: "10px", margin: 0 }}>
					{doctors.map((doc) => (
						<li
							key={doc.user_id}
							style={{
								border: "1px solid #555",
								borderRadius: "8px",
								padding: "10px",
								marginBottom: "10px",
								backgroundColor: "#2a2a2a",
								color: "#fff",
							}}
						>
							<strong style={{ fontSize: "1.2em" }}>{doc.name}</strong>
							<div>Rating: ⭐ {doc.rating}</div>
							<div>Fee: ${Number(doc.consultation_fee).toFixed(2)}</div>

							{doc.qualifications
								.filter((q) => q && q.trim() !== "")
								.map((q, i) => (
									<li key={i} style={{ marginBottom: "4px" }}>{q}</li>
								))}


							<button
								onClick={() => setSelectedDoctor(doc)}
								style={{
									marginTop: "8px",
									padding: "5px 10px",
									backgroundColor: "#444",
									color: "#fff",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								See Schedule
							</button>
						</li>
					))}
				</ul>
			</div>

			{selectedDoctor && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						backgroundColor: "rgba(0,0,0,0.6)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 999,
					}}
				>
					<div
						style={{
							backgroundColor: "#222",
							padding: "20px",
							borderRadius: "10px",
							color: "#fff",
							width: "300px",
							boxShadow: "0 0 10px rgba(0,0,0,0.5)",
						}}
					>
						<h4>{selectedDoctor.name}'s Schedule</h4>
						<ul style={{ paddingLeft: "20px" }}>
							{mockSchedule.map((slot, index) => (
								<li key={index}>{slot}</li>
							))}
						</ul>
						<button
							onClick={handleClosePopup}
							style={{
								marginTop: "10px",
								backgroundColor: "#555",
								color: "#fff",
								border: "none",
								borderRadius: "5px",
								padding: "6px 12px",
								cursor: "pointer",
							}}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
