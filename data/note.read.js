import fs from "fs";
import path from "path";

// Path to the notes JSON file
const filePath = path.resolve("data/notes.json");

// Read notes from the JSON file
export const readNotes = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Write notes to the JSON file
export const writeNotes = (notes) => {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
};
