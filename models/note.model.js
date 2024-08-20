import mongoose from "mongoose";

// Define the schema for the Note model
const noteModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Note model
const Note = mongoose.model("NoteModel", noteModel);
export default Note;
