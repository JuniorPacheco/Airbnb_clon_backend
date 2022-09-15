const Roles = require("../models/role.model");

const getRoles = async (req, res, next) => {
  const dataRoles = await Roles.findAll({
    where: { name: ["admin", "host", "guest"] },
  });

  const rolesObject = {};

  
  dataRoles.forEach((role) => {
      rolesObject[role.dataValues.name] = role.dataValues.id;
    });
    
    req.dataRoles = { ...rolesObject };

  next()
};

module.exports = getRoles;
