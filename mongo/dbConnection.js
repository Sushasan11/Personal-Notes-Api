import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const dbConnect = async () => {
  try {
    // Connect to the MongoDB database using the connection URL from environment variables
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};
