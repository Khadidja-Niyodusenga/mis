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
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("frontside")); // serves your frontend from 'public' folder

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
