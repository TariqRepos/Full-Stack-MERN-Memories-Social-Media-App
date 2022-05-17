import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"; // Cross Origin Resource Sharing (CORS) is a W3C standard that allows a server to relax the same-origin policy

// Express setup
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true})); // Limits size since we have images
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true})); // Limits size since we have images
app.use(cors());

// Mongdb setup
const DB_USERNAME = "tariqmuhanna";
const DB_PASSWORD = "Fundatabase1";
const CONNECTION_URL = "mongodb+srv://" + DB_USERNAME + ":" + DB_PASSWORD + "@cluster0.upyib.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// Connect with mongoose and set promises for success and failure
// Helps prevents warnings in console
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log("Server running on port: " + PORT)))
    .catch((error) => console.log(error.message));
