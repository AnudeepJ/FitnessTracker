const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes.js'); //Normal for all users
const workoutLogRoutes = require('./routes/workoutLogRoutes.js'); //Normal for all users
const waterLogRoutes = require('./routes/waterLogRoutes.js'); //Normal for all users

const userUserRoutes = require('./routes/userUserRoutes.js'); //For specific users (as per the username)
const workoutLogUserRoutes = require('./routes/workoutLogUserRoutes.js'); //For specific users (as per the username)
const waterLogUserRoutes = require('./routes/waterLogUserRoutes.js'); //For specific users (as per the username)

const userGetRoutes =  require('./routes/userGetRoutes.js'); //To get data from users
const workoutLogGetRoutes = require('./routes/workoutLogGetRoutes.js'); //To get data from users
const waterLogGetRoutes = require('./routes/waterLogGetRoutes.js'); //To get data from users

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));


// This is for all the users.
app.use("/api/users", userRoutes);
app.use("/api/workoutlog", workoutLogRoutes);
app.use("/api/waterlog", waterLogRoutes);

// Now for specific users.
app.use("/api/users", userUserRoutes);
app.use("/api/workoutlog", workoutLogUserRoutes);
app.use("/api/waterlog", waterLogUserRoutes);

// Now for adding data for users.
app.use("/api/userGet", userGetRoutes);
app.use("/api/workoutLogGet", workoutLogGetRoutes);
app.use("/api/waterLogGet", waterLogGetRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started on port " + (process.env.PORT || 8000));
});
