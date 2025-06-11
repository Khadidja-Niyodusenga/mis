// // server.js

// const express = require("express");
// const path = require("path");
// const app = express();

// // Serve static files (like index.html and script.js)
// app.use(express.static(path.join(__dirname)));

// // Define the port for deployment (Render needs this!)
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors"); // 1. Require cors here
const path = require("path");
const app = express();

const PORT = process.env.PORT || 10000;

app.use(cors()); // 2. Use cors middleware here

app.use(express.json()); // Also add this to parse JSON request bodies

// Serve static files from the 'frontside' folder
app.use(express.static(path.join(__dirname, "frontside")));

let students = [];
let currentId = 1;

// Your routes below...

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const { name, level } = req.body;
  if (!name || !level) {
    return res.status(400).json({ error: "Name and level are required" });
  }
  const newStudent = { id: currentId++, name, level };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, level } = req.body;
  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  if (name) student.name = name;
  if (level) student.level = level;

  res.json(student);
});

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Student not found" });

  students.splice(index, 1);
  res.status(204).end();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontside", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
