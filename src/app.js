const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const usersRouter = require("./routes/usersRoute");
const lockerRouter = require("./routes/lockerRoute");

app.use("/dashboard", adminDashboardRoutes);
app.use("/", usersRouter);
app.use("/locker", lockerRouter);

// ✅ Single safe fallback
// ✅ SAFE SPA fallback (avoids path-to-regexp parsing on '*')
app.use((req, res, next) => {
  if (
    req.path.startsWith('/TestDasboard') ||
    req.path.startsWith('/dashboard')
  ) {
    return next();
  }
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

module.exports = app;
