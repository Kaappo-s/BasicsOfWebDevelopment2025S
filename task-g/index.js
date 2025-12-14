// index.js
// Author: Ville Heikkiniemi
// Date: 2025-10-06
// Builds timetable rows from addCourseForm


function getDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
}


document.addEventListener("DOMContentLoaded", () => {
  const CHECK = "✅";
  const CROSS = "❌";
  const dayOrder = ["Tue", "Thu"];

  // Form & table
  const form = document.getElementById("addCourseForm");
  const tableBody = document
    .getElementById("timetable")
    .querySelector("tbody");

  // Submit handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // --- Read form values ---
    const courseName = form.courseName.value.trim();
    const päiväys = getDate();
    const studentName = form.studentName.value.trim();
    const email = form.email.value.trim();
    const phone = form.pnumero.value.trim();
    const birthday = form["späivä"].value;
    const termsAccepted = form.ehdot.checked ? CHECK : CROSS;

    if (!courseName) return;

    // --- Read checked days ---
    const checkedDays = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked'))
        .map(cb => cb.value)
    );

    // --- Create table row ---
    const row = document.createElement("tr");

    // Helper to add cell
    const addCell = (text) => {
      const td = document.createElement("td");
      td.textContent = text;
      row.appendChild(td);
    };

    addCell(courseName);
    addCell(päiväys)
    addCell(studentName);
    addCell(email);
    addCell(phone);
    addCell(birthday);

    // Day columns (Tue / Thu)
    dayOrder.forEach(day => {
      addCell(checkedDays.has(day) ? CHECK : CROSS);
    });

    // Terms column
    addCell(termsAccepted);

    tableBody.appendChild(row);

    // --- Reset form ---
    form.reset();
    form.courseName.focus();



  });
});
