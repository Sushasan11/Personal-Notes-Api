import { json } from "express";
import Note from "../models/note.model.js";

//Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, isFavourite } = req.body;
    const newNote = new Note({
      title,
      content,
      isFavourite,
    });
    const note = await newNote.save();
    console.log("Note", title);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific note by ID
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isFavourite } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, isFavourite },
      { new: true }
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: `The selected note ID ${id} not found` });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get all notes
export const getNotes = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }

      const notes = await Note.find(query);
      res.status(200).json(notes);
    } else {
      const notes = await Note.find();
      res.status(200).json(notes);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific note by ID
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res
        .status(404)
        .json({ message: `The selected note ID ${id} not found` });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete a specific note by ID
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res
        .status(404)
        .json({ message: `The selected note ID ${id} not found` });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Note by keyword
export const searchNotes = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ message: "Search keyword is required" });
    }

    const notes = await Note.find({
      title: { $regex: keyword, $options: "i" },
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
