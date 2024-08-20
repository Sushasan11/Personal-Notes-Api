import { Router } from "express";
import {
  createNote,
  updateNote,
  getNotes,
  getNoteById,
  deleteNote,
  searchNotes,
} from "../controllers/note.controller.js";

const router = Router();

// Route to create a new note
router.post("/create", createNote);

// Route to update a specific note by ID
router.put("/update/:id", updateNote);

// Route to get a specific note by ID
router.get("/id/:id", getNoteById);

// Route to get all notes
router.get("/result", getNotes);

// Route to delete a specific note by ID
router.delete("/delete/:id", deleteNote);

// Route to search notes by keyword
router.get("/search", searchNotes);

export default router;
