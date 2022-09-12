const jwt = require("jsonwebtoken");

const { loginUser } = require("./auth.controllers");

const login = async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    return res.status(400).json({ message: "Missing Data" });
  }

  const response = await loginUser(data.email, data.password);

  if (response) {
    const token = jwt.sign(
      {
        id: response.id,
        email: response.email,
        roleId: response.roleId,
        isVerified: response.isVerified,
      },
      "academlo"
    );
    return res
      .status(200)
      .json({ message: "Tus credenciales son correctas", token });
  } else {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  login,
};
