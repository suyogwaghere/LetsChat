const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { json } = require("express");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);
// app.get("/api/chats", (req, res) => {
//   res.send(chats);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
