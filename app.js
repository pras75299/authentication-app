import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/connectdb.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT;
const app = express();
const DATABASE_URL = process.env.CONNECTION;

//cors policy
app.use(cors());

// database
connectDb(DATABASE_URL);

app.use(express.json());

app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("hello this is get");
});

app.listen(PORT, (req, res) => {
  console.log(`Everything is working fine ${PORT}`);
});
