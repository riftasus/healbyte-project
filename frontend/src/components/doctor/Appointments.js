// import React from "react";

// /*
//   Appointments displays a list of upcoming appointments for the doctor.
//   Replace the dummy data with real data as needed.
// */
// function Appointments(props) {
//   // Dummy appointments data for demonstration
//   var appointments = [
//     { id: 1, patient: "John Doe", date: "2025-06-07", time: "10:00 AM" },
//     { id: 2, patient: "Jane Smith", date: "2025-06-07", time: "11:30 AM" }
//   ];

//   return (
//     <div>
//       <h5>Upcoming Appointments</h5>
//       <ul>
//         {appointments.map(function(appt) {
//           return (
//             <li key={appt.id}>
//               {appt.date} at {appt.time} - {appt.patient}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default Appointments;