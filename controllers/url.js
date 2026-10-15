import { nanoid } from "nanoid";
import Url from "../models/urlModel.js";

const handleCreateUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const parsedUrl = new URL(originalUrl);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({ error: "URL must use http or https" });
    }

    const url = await Url.create({
      originalUrl,
      shortUrl: nanoid(8),
    });

    res.status(201).json(url);
  } catch (error) {
    console.error("URL creation failed:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({ error: "Short URL already exists" });
    }

    res.status(400).json({ error: error.message });
  }
};

const handleFindUrl = async (req, res) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl: req.params.shortUrl },
      { $inc: { clickCount: 1 } },
      { new: true },
    );

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("URL lookup failed:", error.message);
    return res.status(500).json({ error: "Unable to find short URL" });
  }
};

const handleUrlAnalytics = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl }).select(
      "shortUrl originalUrl clickCount",
    );

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      shortUrl: url.shortUrl,
      originalUrl: url.originalUrl,
      clickCount: url.clickCount ?? 0,
    });
  } catch (error) {
    console.error("URL analytics lookup failed:", error.message);
    return res.status(500).json({ error: "Unable to find URL analytics" });
  }
};

export { handleCreateUrl, handleFindUrl, handleUrlAnalytics };