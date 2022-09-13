const Users = require("../models/user.model");
const Roles = require("../models/role.model");
const Places = require("../models/places.model");
const Accommodations = require("../models/accommodations.model");
const Reservations = require("../models/reservations.model");

const generateData = async () => {
  await Roles.bulkCreate(
    [
      { name: "guest", id: "fef3a08d-2cec-4728-9745-7cbd2b37e557" },
      { name: "host", id: "97006fe0-4a35-47f4-bfbf-fc962e5fe500" },
      { name: "admin", id: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473" },
    ],
    { validate: true }
  );

  await Users.create({
    id: "3911e153-2d4a-4338-a4d6-a17fd38fea99",
    name: "Junior Pacheco",
    gender: "Masculino",
    birthdayDate: "2016-06-23",
    email: "junior@academlo.com",
    password: "$2b$10$EXB34AWjYZkbb6WLhfEome074/c/JzhL0/mon/sffXmJDc4qkq1PW", //1234
    phone: "",
    dni: "1234567891",
    roleId: "97006fe0-4a35-47f4-bfbf-fc962e5fe500",
    profileImg: "",
    status: "active",
    verified: false,
  });

  await Users.create({
    id: "4093ab84-6ae6-4e20-809c-ecdec8e06267",
    name: "Fabian Moyano",
    gender: "Masculino",
    birthdayDate: "2016-06-23",
    email: "fabian@academlo.com",
    password: "$2b$10$EXB34AWjYZkbb6WLhfEome074/c/JzhL0/mon/sffXmJDc4qkq1PW", //1234
    phone: "",
    dni: "1234567891",
    roleId: "fef3a08d-2cec-4728-9745-7cbd2b37e557",
    profileImg: "",
    status: "active",
    verified: false,
  });

  await Users.create({
    id: "9fbc82bd-42ae-4b9b-b926-7212ac31227a",
    name: "Pacheco Moyano",
    gender: "Masculino",
    birthdayDate: "2016-06-23",
    email: "pacheco@academlo.com",
    password: "$2b$10$EXB34AWjYZkbb6WLhfEome074/c/JzhL0/mon/sffXmJDc4qkq1PW", //1234
    phone: "",
    dni: "1234567891",
    roleId: "fef3a08d-2cec-4728-9745-7cbd2b37e557",
    profileImg: "",
    status: "active",
    verified: false,
  });

  await Users.create({
    id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    name: "Sahid Kick",
    gender: "male",
    email: "sahid@academlo.com",
    password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC", // root
    phone: "1234567890",
    birthdayDate: "2000-10-22",
    dni: "",
    address: "",
    roleId: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473",
    profileImage: "asd.com",
    status: "active",
    verified: false,
  });

  await Places.bulkCreate([
    {
      id: "864ee3c2-facd-4a23-8b4a-4e9d342d9036",
      city: "Guadalajara",
      state: "Jalisco",
      country: "México",
      continent: "America",
    },
    {
      id: "9c0412b6-7d56-4347-8fbe-5455e8a42438",
      city: "Zapopan",
      state: "Jalisco",
      country: "México",
      continent: "America",
    },
    {
      id: "3436a556-6623-40ba-88b8-2e01009f9d82",
      city: "Suba",
      state: "Bogotá",
      country: "Colombia",
      continent: "America",
    },
    {
      id: "134a55b6-487c-46cc-a5b5-9392af20c205",
      city: "Medellín",
      state: "Antioquia",
      country: "Colombia",
      continent: "America",
    },
    {
      id: "3a230417-80ae-4232-a8ff-6fd50068a777",
      city: "Azcapotzalco",
      state: "CDMX",
      country: "México",
      continent: "America",
    },
    {
      id: "0d907427-7623-4ec9-8c6d-270bb92fbbe7",
      city: "Monterrey",
      state: "Muevo León",
      country: "México",
      continent: "America",
    },
  ]);

  await Accommodations.create({
    id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    title: "premium - vistas 360 ciudad (alberca y gym)",
    description: "asd",
    guests: 6,
    rooms: 3,
    beds: 3,
    bathrooms: 4.5,
    price: 1536.0,
    hostId: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    placeId: "9c0412b6-7d56-4347-8fbe-5455e8a42438",
    commision: 150.0,
  });

  await Accommodations.create({
    id: "35a42549-262e-4ad0-b6a9-82f281211992",
    title: "Esta la creo junior",
    description: "asdf",
    guests: 6,
    rooms: 3,
    beds: 3,
    bathrooms: 4.5,
    price: 1536.0,
    hostId: "3911e153-2d4a-4338-a4d6-a17fd38fea99",
    placeId: "9c0412b6-7d56-4347-8fbe-5455e8a42438",
    commision: 150.0,
  });

  await Reservations.create({
    id: "7383c6f8-7bc2-4058-b099-c3aff3d6f6e4",
    userId: "3911e153-2d4a-4338-a4d6-a17fd38fea99",
    arrival: "2022-09-12 09:08:13.756 -0500",
    departure: "2022-10-12 09:08:13.756 -0500",
    accommodationId: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    adults: 1,
  });

  await Reservations.create({
    id: "59651d5f-b174-4d80-a6e5-fe22458ff112",
    userId: "4093ab84-6ae6-4e20-809c-ecdec8e06267",
    arrival: "2022-09-12 09:08:13.756 -0500",
    departure: "2022-10-12 09:08:13.756 -0500",
    accommodationId: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    adults: 2,
  });
};

exports.generateData = generateData;
