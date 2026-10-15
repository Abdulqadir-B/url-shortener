import express from "express";

const router = express.Router();
import {
	handleCreateUrl,
	handleFindUrl,
	handleUrlAnalytics,
} from "../controllers/url.js";

router.post("/", handleCreateUrl);

router.get("/:shortUrl/analytics", handleUrlAnalytics);

router.get("/:shortUrl", handleFindUrl);

export default router;