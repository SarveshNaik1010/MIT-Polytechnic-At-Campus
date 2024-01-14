const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

// dot env files
dotenv.config({ path: "./config.env" });

// Connecting to the Database
const DB = process.env.DB_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://SarveshNaik:mitp_123@polyatcampus.0j2cd0v.mongodb.net/`
  )
  .then(() => {
    console.log(`DB Connection successfull...`);
  });

// Starting the server
app.listen(process.env.PORT, function () {
  console.log(`App running on port ${process.env.PORT}...`);
});
