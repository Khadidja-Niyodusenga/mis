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
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "frontside")));

// Serve index.html on root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontside", "index.html"));
});

// Remove or comment out your old res.send message route if present

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
