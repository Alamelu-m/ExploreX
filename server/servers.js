const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();
connectDB(); // MongoDB connection


const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/trip", require("./routes/triproute"));
app.use("/api/recommended", require("./recommended/recommended.routes"));
app.use("/api/chat", require("./chatbot/chatbot.routes"));


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
