const userControllers = require("./users.controllers");

const getAll = (req, res) => {
  userControllers
    .getAllUsers()
    .then((data) => {
      res.status(200).json({ items: data.length, users: data });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const id = req.params.id;
  userControllers
    .getUserById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: `Doesn't exist user with id ${id}` });
    });
};

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.password ||
    !data.birthday_date ||
    !data.country
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        birthday_date: "DD/MM/YYYY",
        country: "string",
      },
    });
  } else {
    userControllers
      .createUser(data)
      .then((response) => {
        res.status(201).json({
          message: `User created succesfully with id: ${response.id}`,
          user: response,
        });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  userControllers
    .deleteUser(id)
    .then((response) => {
      if (response) {
        res.status(204).json();
      } else {
        res.status(400).json({ message: `Invalid Id` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  
  if (!Object.keys(data).length) {
    return res.status(400).json({
      message: "At least one field must be filled",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        phone: "+521231231230",
        rol: "normal",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true,
      },
    });
  } else {
    userControllers
      .editUser(id, data)
      .then((response) => {
        if (response[0]) {
          return res.status(200).json({
            message: `User edited succesfully with id ${id}`,
          });
        } else {
          return res.status(404).json({ message: "Invalid id" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }
};

const editMyUser = (req, res) => {
  const id = req.user.id;

  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({
      message: "At least one field must be filled",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        phone: "+521231231230",
        rol: "normal",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true,
      },
    });
  } else {
    userControllers
      .editMyUser(id, data, dataRoles)
      .then((response) => {
        if (response[0]) {
          return res.status(200).json({
            message: `User edited succesfully with id ${id}`,
          });
        } else {
          return res.status(404).json({ message: "Invalid id" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  }
};

const getMyUser = (req, res) => {
  console.log("Voy aca");
  const id = req.user.id;
  userControllers
    .getUserById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: `El usuario con el id ${id} no existe` });
    });
};

const removeMyUser = (req, res) => {
  const id = req.user.id;
  userControllers
    .deleteUser(id)
    .then((response) => {
      if (response) {
        res.status(204).json();
      } else {
        res.status(400).json({ message: `Invalid Id` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  editMyUser,
  getMyUser,
  removeMyUser,
};
