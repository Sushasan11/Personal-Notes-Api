// Import the Express library for creating the server
import express from "express";

// Import the Morgan library for logging HTTP requests
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnect } from "./mongo/dbConnection.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();
dotenv.config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log HTTP requests in a combined format
app.use(morgan("combined"));

// Connect to the database
dbConnect();

// Use the noteRoute module to handle requests to the /note endpoint
app.use("/notes", noteRoutes);

// Start the Express server on the specified port and log a success message
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
