// Import express framework
const express = require("express");

// Create an instance of the Express application
const app = express();

// Sample dataset
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// Root route - Displays a message when accessing the base URL
app.get("/", (req, res) => {
  res.send("<h1>Hola</h1>");
});

/**
 * GET /api/notes
 * Returns a list of all notes in JSON format
 */
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

/**
 * GET /api/notes/:id
 * Fetches a single note by its ID
 * If the note is found, returns it in JSON format
 * If not found, responds with a 404 status
 */
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

// Define the port number for the server
const PORT = 3000;

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
