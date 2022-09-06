const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

//? Importación del modelo
const Users = require('../models/user.model');
const UserImages = require("../models/userImages.model");
const Roles = require("../models/role.model");
const Reservations = require("../models/reservations.model");
const Places = require("../models/places.model");
const Accommodations = require("../models/accommodations.model");
const AccommodationImages = require("../models/accommodationImages.model");

const userDB = [{
  "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  "first_name": "Sahid",
  "last_name": "Kick",
  "email": "sahid.kick@academlo.com",
  "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  "phone": "1234567890",
  "birthday_date": "22/10/2000",
  "rol": "normal",
  "profile_image": "",
  "country": "mexico",
  "is_active": true,
  "verified": false
}];

const getAllUsers = async () => {
  const data = await Users.findAll({
    attributes:{
      exclude: ['password']
    }
  })
  const data2 = await UserImages.findAll()
  const data3 = await Roles.findAll()
  const data4 = await Reservations.findAll()
  const data5 = await Places.findAll()
  const data6 = await Accommodations.findAll()
  const data7 = await AccommodationImages.findAll()
  return data;
  //? select * from users;
};

const getUserById = async (id) => {
  const data = await Users.findOne({
    where: {
      id: id
    },
    attributes: {
      exclude: ['password']
    }
  });
  return data;
  //? select * from users where id = ${id};
};

const createUser = (data) => {
  const newUser = Users.create({
    ...data,
    id: uuid.v4(),
    password: hashPassword(data.password),
    rol: "normal",
    is_active: true,
    verified: false,
  })
  return newUser;
};

const editUser = (id, data) => {
  const index = userDB.findIndex((user) => user.id === id);
  if (index !== -1) {
    userDB[index] = {
      id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: userDB[index].password,
      phone: data.phone, //unico
      birthday_date: data.birthday_date,
      rol: data.rol,
      profile_image: data.profile_image,
      country: data.country,
      is_active: data.is_active,
      verified: false,
    };
    return userDB[index];
  } else {
    return createUser(data);
  }
};

const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id
    }
  })
  return data
}

const getUserByEmail = (email) => {
  const data = userDB.filter((item) => item.email === email);
  return data.length ? data[0] : false
  //? select * from users where email = ${email};
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail
}

