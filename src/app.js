const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// CORS configuration for LAN access
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost and LAN IPs
    const allowedOrigins = [
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      // Add your specific LAN IP if needed
      // 'http://192.168.0.23:8080',
    ];
    
    // Allow any origin in development (for flexibility)
    // Remove this in production and specify exact origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
app.use('/admin/dashboard', adminDashboardRoutes);

const usersRouter = require('./routes/usersRoute');
app.use('/', usersRouter);

const lockerRouter = require('./routes/lockerRoute');
app.use('/locker', lockerRouter);

const profilePicture = require('./routes/profilePicture');
app.use('/', profilePicture);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;