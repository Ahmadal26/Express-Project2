module.exports = (req, res, next) => {
  return next({ status: 404, message: "Path Not Found" });
};

// Page not Found = Path Not Found
