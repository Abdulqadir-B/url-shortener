import express from "express";

const router = express.Router();
import {handleCreateUrl, handleFindUrl } from "../controllers/url.js";

router.post("/", handleCreateUrl);

router.get("/:shortUrl", handleFindUrl);

export default router;