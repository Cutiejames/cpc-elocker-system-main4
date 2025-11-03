require('dotenv').config();
const app = require('./app');
const cron = require('node-cron');
const expireReservations = require('./jobs/expireReservations');

const port = process.env.PORT || 3001;
const host = process.env.HOST || '0.0.0.0'; // Listen on all interfaces for LAN access

// run every minute
cron.schedule('* * * * *', expireReservations);

app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
    console.log(`Access from LAN: http://192.168.254.152:${port}`);
});