import express from "express";
import mongoose from "mongoose";
import router from "./main.js";
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/gymDB")
.then(() => {
    console.log("MongoDB Connected");
});

app.use("/api/v1/user", router);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});