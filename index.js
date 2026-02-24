require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./config/db.js");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
