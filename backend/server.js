require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");

// Initial Config
const app = express();
const port = process.env.SERVER_PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// allow cors requests from any origin and with credentials
app.use(
    cors({
      origin: (origin, callback) => callback(null, true),
      credentials: true,
    })
  );

// Api Routes
app.get('/', (req, res) => res.json("Server working..."))
app.use("/upload", require("controllers/upload.controller"));
app.get('*', (req, res) => res.status(404).json("API route not found"));

// Global error handler
app.use(errorHandler);

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));