const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");


dotenv.config();
connectDB(); 


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,              
}));


app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/trip", require("./routes/triproute"));
app.use("/api/recommended", require("./recommended/recommended.routes"));
app.use("/api/chat", require("./chatbot/chatbot.routes"));
app.use("/api/location", require("./routes/location"));
app.use("/api/users", require("./routes/user"));
app.use("/api/places", require("./routes/places"));
app.use("/api/search", require("./routes/search"));
app.use("/api/logistics",require("./routes/logisticsroutes"));
app.use("/api/map", require("./routes/maproute"))

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
