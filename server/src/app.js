const express = require("express");
const connectDB = require("../config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
));



connectDB();

app.get("/", (req, res) => res.send("Hello world!"));

// routes
const articlesRoutes = require("./routes/articleRoutes");
const clientRoutes = require("./routes/clientRoutes");
const reportRoutes = require("./routes/reportRoutes");
const salesmanRoutes = require("./routes/salesmanRoutes");

app.use('/api/article', articlesRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/salesman', salesmanRoutes);

// auth routes
const authRoutes = require("./routes/authRoutes");
app.use('/api/auth', authRoutes);

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(err)
  res.status(500).send("Something broke!");
});

module.exports = app;
