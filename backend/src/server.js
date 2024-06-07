import express from "express";
import Redis from "ioredis";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import voteRouter from "./router/vote.js";


dotenv.config();



// mongodb connection
try {
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log("*** Success: Connected to mongodb server ***");
} catch (err) {
  console.error(
    `*** Error: Failed to connect to mongodb server: ${err.message} ***`
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// serving the front end`
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// METHOD: POST
// ACCESS: PUBLIC
// ENDPOINT: /votes

app.use("/api/v1",voteRouter );

// handling invalid endpoints
app.use("*", (req, res) => {
  return res
    .status(404)
    .json({ message: "The Endpoint request is not found", status: "error" });
});

// srver listening on port
const PORT = process.env.PORT | 5050;

app.listen(PORT, () => {
  console.log(`*** Success: Server is listening on PORT: ${PORT} ***`);
});
