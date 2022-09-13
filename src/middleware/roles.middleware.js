const Roles = require("../models/role.model");

const roleAdminMiddleware = async (req, res, next) => {
  const roleId = req.user.roleId;
  const adminRole = await Roles.findOne({
    where: {
      name: "admin",
    },
  });
  if (adminRole.dataValues?.id === roleId) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "User not authorized to make this request",
    });
  }
};

const roleGuestMiddleware = async (req, res, next) => {
  const roleId = req.user.roleId;
  const adminRole = await Roles.findOne({
    where: {
      name: "guest",
    },
  });

  if (adminRole.dataValues?.id === roleId) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "User not authorized to make this request",
    });
  }
};

const roleHostMiddleware = async (req, res, next) => {
  const roleId = req.user.roleId;
  const adminRole = await Roles.findOne({
    where: {
      name: "host",
    },
  });
  
  if (adminRole.dataValues?.id === roleId) {
    next();
  } else {
    res.status(401).json({
      status: "error",
      message: "User not authorized to make this request",
    });
  }
};

const roleHostOrAdmin = async (req, res, next) => {
  const roleId = req.user.roleId;
  const rolesData = await Roles.findAll({
    where: {
      name: ["host", "admin"],
    },
  });
  if (
    rolesData[0].dataValues?.id === roleId ||
    rolesData[1].dataValues?.id === roleId
  ) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "You do not have permissions for this action" });
  }
};

const roleHostOrGuest = async (req, res, next) => {
  const roleId = req.user.roleId;
  const rolesData = await Roles.findAll({
    where: {
      name: ["host", "guest"],
    },
  });
  if (
    rolesData[0].dataValues?.id === roleId ||
    rolesData[1].dataValues?.id === roleId
  ) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: "You do not have permissions for this action" });
  }
};

module.exports = {
  roleAdminMiddleware,
  roleGuestMiddleware,
  roleHostMiddleware,
  roleHostOrAdmin,
  roleHostOrGuest
};
