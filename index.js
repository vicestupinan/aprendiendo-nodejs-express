// Import express framework
const express = require("express");

// Create an instance of the Express application
const app = express();
app.use(express.json());

// Sample dataset
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
    date: "2019-05-30T17:30:31.098Z",
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
    date: "2019-05-30T18:39:34.091Z",
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
    date: "2019-05-30T19:20:14.298Z",
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
    res.status(200).json(note);
  } else {
    res.status(404).end();
  }
});

/**
 * DELETE /api/notes/:id
 * Deletes a note by its ID
 * If the note is found, removes it from the dataset and responds with a 204 status
 * If not found, no action is taken, but the response still returns a 204 status
 */
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

/**
 * POST /api/notes
 * Creates a new note based on the content provided in the request body
 */
app.post("/api/notes", (req, res) => {
  const note = req.body;
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };

  notes = [...notes, newNote];

  res.status(201).json(newNote);
});

// Define the port number for the server
const PORT = 3000;

// Start the Express server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
