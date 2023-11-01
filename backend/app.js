const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerRouter = require("./modules/swagger/swagger.router");
const recipesRouter = require("./routes/recipes/recipes.router");
const { usersRouter } = require("./modules/users/users.router");
const path = require("path");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api/docs", swaggerRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
