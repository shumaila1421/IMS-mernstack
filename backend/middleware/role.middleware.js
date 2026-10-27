function allowRoles(...roles) {
  return function (req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You don't have permission to do this",
      });
    }

    next();
  };
}

module.exports = allowRoles;
