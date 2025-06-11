const API_URL = "https://https://msrp.onrender.com/students"; // We'll update this URL later

// Elements
const studentForm = document.getElementById("student-form");
const studentIdInput = document.getElementById("student-id");
const studentNameInput = document.getElementById("student-name");
const studentLevelInput = document.getElementById("student-level");
const studentsBody = document.getElementById("students-body");

// Load students on page load
window.onload = fetchStudents;

function fetchStudents() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      studentsBody.innerHTML = "";
      data.forEach((student) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${student.level}</td>
          <td>
            <button onclick="editStudent(${student.id}, '${student.name}', '${student.level}')">Edit</button>
            <button onclick="deleteStudent(${student.id})">Delete</button>
          </td>
        `;
        studentsBody.appendChild(tr);
      });
    })
    .catch((err) => alert("Error loading students: " + err));
}

// Add or Update student
studentForm.onsubmit = function (e) {
  e.preventDefault();
  const id = studentIdInput.value;
  const name = studentNameInput.value.trim();
  const level = studentLevelInput.value.trim();

  if (!name || !level) {
    alert("Please fill in all fields");
    return;
  }

  if (id) {
    // Update student (PUT)
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, level }),
    })
      .then((res) => res.json())
      .then(() => {
        resetForm();
        fetchStudents();
      })
      .catch((err) => alert("Update failed: " + err));
  } else {
    // Create student (POST)
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, level }),
    })
      .then((res) => res.json())
      .then(() => {
        resetForm();
        fetchStudents();
      })
      .catch((err) => alert("Create failed: " + err));
  }
};

// Fill form for editing
function editStudent(id, name, level) {
  studentIdInput.value = id;
  studentNameInput.value = name;
  studentLevelInput.value = level;
}

// Delete student
function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => fetchStudents())
      .catch((err) => alert("Delete failed: " + err));
  }
}

function resetForm() {
  studentIdInput.value = "";
  studentNameInput.value = "";
  studentLevelInput.value = "";
}
