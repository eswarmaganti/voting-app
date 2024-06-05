import express from "express";
import Redis from "ioredis";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const redis = new Redis(process.env.REDIS_URI);

const app = express();
app.use(express.json());
app.use(cors());

// serving the front end
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// METHOD: POST
// ACCESS: PUBLIC
// ENDPOINT: /vote

app.post("/vote", async (req, res) => {
  const bikeCompanies = [
    "royal enfield",
    "yamaha",
    "bajaj",
    "hero",
    "honda",
    "bmw",
  ];

  try {
    const { name, email, vote } = req.body;

    if (name == null || name.length < 3) {
      return res.status(400).json({
        message: "Invalid Name provided, should be minimum 3 characters",
        status: "error",
      });
    }

    if (email == null || email.length < 3) {
      return res.status(400).json({
        message: "Invalid Name provided, should be minimum 3 characters",
        status: "error",
      });
    }

    if (!bikeCompanies.includes(vote)) {
      return res.status(400).json({
        message: "Invalid Name provided, should be minimum 3 characters",
        status: "error",
      });
    }

    await redis.set(
      "user",
      JSON.stringify({
        name: name,
        email: email,
        vote: vote,
      })
    );

    return res
      .status(201)
      .json({ message: "Successfully saved vote", status: "success" });
  } catch (err) {
    console.error(`*** Error: Something went wrong in runtime: ${err.message}`);
    return res.status(500).json({
      message: "Something went wrong, try again later",
      status: "error",
    });
  }
});

// handling invalid endpoints
app.use("*", (req, res) => {
  return res
    .status(404)
    .json({ message: "The Endpoint request is not found", status: "error" });
});


// srver listening on port
const PORT = process.env.PORT | 5050;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
