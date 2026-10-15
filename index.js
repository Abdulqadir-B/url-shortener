import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/urls', urlRoutes);

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
