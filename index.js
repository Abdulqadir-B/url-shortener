import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;



app.listen(PORT, `Server is listening on PORT : ${PORT}`);