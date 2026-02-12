require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const feedbackRoutes = require("./routes/feedback");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", feedbackRoutes);

app.listen(PORT, () => {
  console.log(`App corriendo en puerto ${PORT}`);
});