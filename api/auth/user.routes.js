const express = require("express");
const {
  getUser,
  createUser,
  update,
  deleteUser,
  fetchUser,
  signin,
} = require("./user.controllers");
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
router.post("/createUser", createUser);

//signin
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
