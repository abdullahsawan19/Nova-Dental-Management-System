exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.path === "/me") {
      return next();
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
