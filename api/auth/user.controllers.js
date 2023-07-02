const User = require("../../models/User");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");

exports.fetchUser = async (tempId, next) => {
  try {
    const temp1 = await User.findById(tempId);
    return temp1;
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const temps = await User.find().select("-__v");
    return res.status(200).json(temps);
  } catch (error) {
    return next(error);
  }
};

//1 - signup - register (username, password , email, profileImage)
//https://jwt.io/#debugger-io - decode the result token and see payload
exports.signup = async (req, res, next) => {
  try {
    //fetching the image from user
    if (req.file) {
      req.body.profileImage = `${req.file.path}`;
    }
    const { password } = req.body;
    req.body.password = await passHash(password);
    // create user
    const newUser = await User.create(req.body);
    // generate Token
    const token = generateToken(newUser);
    // return Token
    res.status(201).json({ message: "You are Registered now!", token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//2 - sign in - (userId, username, email, token expiration)
exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
//7- a user can update a movie by id
exports.userUpdateById = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      return res.status(401).json({
        message: "You are not Admin and not authorized to update a user!",
        error,
      });
    }
    const foundUser = await Movie.findByIdAndUpdate(req.body._id);

    if (!foundUser) {
      return res.status(404).json({ message: " User not Found" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
