const express = require("express");
const {
  getUser,
  signup,
  update,
  deleteUser,
  fetchUser,
  signin,
} = require("./user.controllers");
const multer = require("multer");
const uploader = require("../../middlewares/uploader");
const router = express.Router();
const passport = require("passport");

router.param("userId", async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.user = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", passport.authenticate("jwt", { session: false }), getUser);
//register - signup
router.post("/signup", uploader.single("profileImage"), signup);

//signin
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

//logou
router.get("/signout", signout);

module.exports = router;
