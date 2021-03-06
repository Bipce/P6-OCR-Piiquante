const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connexion à MongoDB réussie !");
  } catch {
    console.log("Connexion à MongoDB échouée !");
  }
})();

const app = express();

app.use(express.json());

// Allow application to acces API with no problem.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow acces to everybody.
  res.setHeader(
    "Access-Control-Allow-Headers", // Authorize to use hearder mentionned on object req.
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS", // Authorize to send methods mentionned.
  );
  next();
});

app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);

module.exports = app;
