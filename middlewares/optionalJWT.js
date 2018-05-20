module.exports = (req, res, next) => {
  if (req.headers["authorization"]) {
    return passport.authenticate("jwt", { session: false })(req, res, next);
  }
  return next();
};
