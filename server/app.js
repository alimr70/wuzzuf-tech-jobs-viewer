const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

// Init app
const app = express();

// Use essential dependencies
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Handle global errors
app.use((err, req, res, next) => {
  console.error(err);
});

// Init server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`===>Server is running on port ${PORT}`);
});