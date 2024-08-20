import { json } from "express";
import Note from "../models/note.model.js";
import { readNotes, writeNotes } from "../data/note.read.js";

// Create a new note
export const createNote = (req, res) => {
  try {
    const { title, content, isFavourite } = req.body;
    const notes = readNotes();
    const newNote = {
      id: Date.now(),
      title,
      content,
      isFavourite: isFavourite || false,
      createdAt: new Date(),
    };
    notes.push(newNote);
    writeNotes(notes);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific note by ID
export const updateNote = (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isFavourite } = req.body;
    const notes = readNotes();
    const noteIndex = notes.findIndex((note) => note.id === parseInt(id));

    if (noteIndex === -1) {
      return res.status(404).json({ message: `Note with ID ${id} not found` });
    }

    notes[noteIndex] = { ...notes[noteIndex], title, content, isFavourite };
    writeNotes(notes);
    res.status(200).json(notes[noteIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes
export const getNotes = (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const notes = readNotes();
    let filteredNotes = notes;

    if (startDate || endDate) {
      filteredNotes = notes.filter((note) => {
        const createdAt = new Date(note.createdAt);
        return (
          (!startDate || createdAt >= new Date(startDate)) &&
          (!endDate || createdAt <= new Date(endDate))
        );
      });
    }
    res.status(200).json(filteredNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific note by ID
export const getNoteById = (req, res) => {
  try {
    const { id } = req.params;
    const notes = readNotes();
    const note = notes.find((note) => note.id === parseInt(id));

    if (!note) {
      return res.status(404).json({ message: `Note with ID ${id} not found` });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific note by ID
export const deleteNote = (req, res) => {
  try {
    const { id } = req.params;
    let notes = readNotes();
    notes = notes.filter((note) => note.id !== parseInt(id));
    writeNotes(notes);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search notes by keyword
export const searchNotes = (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: "Search keyword is required" });
    }

    const notes = readNotes();
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
    res.status(200).json(filteredNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
