import express from "express";
import { nanoid } from "nanoid";
import "dotenv/config";
import connectDB from "./config/db.js";
import Url from "./models/url.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/urls", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const url = await Url.create({
      originalUrl,
      shortUrl: nanoid(8),
    });

    res.status(201).json(url);
  } catch (error) {
    console.error("URL creation failed:", error.message);
    res.status(400).json({ error: error.message });
  }
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
