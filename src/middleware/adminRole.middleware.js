const Roles = require("../models/role.model");

const roleAdminMiddleware = async (req, res, next) => {
  const rolId = req.user.dataValues.roleId;
  const adminRole = await Roles.findOne({
    where: {
      name: "admin",
    },
  });
  if (adminRole.dataValues.id === rolId) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "User not authorized to make this request",
    });
  }
};

const roleGuestMiddleware = async (req, res, next) => {
  const rolId = req.user.dataValues.roleId;
  const adminRole = await Roles.findOne({
    where: {
      name: "admin",
    },
  });

  if (adminRole.dataValues.id === rolId) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "User not authorized to make this request",
    });
  }
};

const roleHostMiddleware = async (req, res, next) => {
  const rolId = req.user.dataValues.roleId;
  const adminRole = await Roles.findOne({
    where: {
      name: "admin",
    },
  });
  if (adminRole.dataValues.id === rolId) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "User not authorized to make this request",
    });
  }
};

module.exports = {
  roleAdminMiddleware,
  roleGuestMiddleware,
  roleHostMiddleware,
};
