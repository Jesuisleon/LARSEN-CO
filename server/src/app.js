const express = require("express");
const connectDB = require("../config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

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

module.exports = app;
