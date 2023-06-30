const express = require("express");
const connectDb = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path"); //Image File
const app = express();
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./api/auth/user.routes");
const config = require("./config/keys");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

app.use(cors());
connectDb();
app.use(express.json());
app.use(morgan("dev"));

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

// when calling user.routes.js functions, please place /user in ur postman path
app.use("/user", userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});

module.exports = app;

//https://stackoverflow.com/questions/46448637/expressjs-jwt-and-passport-implementation
//https://expressjs.com/en/starter/generator.html
