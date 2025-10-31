require("dotenv").config();
const app = require("./app");
const cron = require("node-cron");
const expireReservations = require("./jobs/expireReservations");

const port = process.env.PORT || 3001;

// 🕒 Run cron job every minute
cron.schedule("* * * * *", expireReservations);

app.listen(port, "192.168.254.100", () => {
  console.log(`✅ Server running at: http://192.168.254.100:${port}`);
});
