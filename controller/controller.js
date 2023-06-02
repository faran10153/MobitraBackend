const jwt = require("jsonwebtoken");
const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");

// const Login = async (req, res) => {
//   const { username, password } = req.body;
//   const adminCred = { username: "admin", password: "admin", role: "admin" };

//   try {
//     // Check if the username and password match the admin credentials
//     if (username === adminCred.username && password === adminCred.password) {
//       // Generate a JSON Web Token (JWT) for admin authentication
//       const token = jwt.sign({ username }, "secret_key");
//       res.json({ token, adminCred });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const Login = async (req, res) => {
  const { username, password } = req.body;
  const adminCred = { username: "admin", password: "admin", role: "admin" };

  try {
    // Check if the username and password match the admin credentials
    if (username === adminCred.username && password === adminCred.password) {
      // Generate a JSON Web Token (JWT) for admin authentication
      const token = jwt.sign({ username }, "secret_key");
      res.json({ token, adminCred });
    } else {
      // Check if the username and password match any user in the database
      const user = await UserSchema.findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Generate a JSON Web Token (JWT) for user authentication
        const token = jwt.sign({ username }, "secret_key");
        res.json({ token, user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const UserRegister = async (req, res) => {
  const saltPassword = await bcrypt.genSalt(15);
  const bcryptPassword = await bcrypt.hash(req.body.password, saltPassword);
  const register = new UserSchema({
    name: req.body.name,
    username: req.body.username,
    uniqueId: req.body.uniqueId,
    vehicleModel: req.body.vehicleModel,
    vehicleNumber: req.body.vehicleNumber,
    password: bcryptPassword,
  });
  await register
    .save()
    .then((data) => {
      res.json({ data, message: "Success" });
    })
    .catch((error) => {
      console.log(error);
    });
};
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserSchema.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserSchema.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { Login, UserRegister, getUser, deleteUser };
