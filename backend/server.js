require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.body) {
    console.log("Request body:");
    console.log(req.body);
  }
  next();
});

//using the routes
app.use("/api/courses", require("./routes/courseRoutes"));

// connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen("3000", () => {
      console.log(`Listening on port 3000`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
