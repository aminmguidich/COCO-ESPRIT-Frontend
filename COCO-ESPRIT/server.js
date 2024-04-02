// app.use(cors());
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS with specific configurations
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);

// Serve the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Define other routes or API endpoints here, if needed

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
