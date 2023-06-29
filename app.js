const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./api/auth/user.routes");
const config = require("./config/keys");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const { create } = require("./models/User");
const { createUser } = require("./api/auth/user.controllers");

app.use(cors());
connectDb();
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

// when calling user.routes.js functions, please place /user in ur postman path
app.use("/user", userRoutes);

app.use(notFound);
app.use(errorHandler);
// app.use("api/auth/", createUser);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});

module.exports = app;

//https://stackoverflow.com/questions/46448637/expressjs-jwt-and-passport-implementation
