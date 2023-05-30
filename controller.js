const jwt = require("jsonwebtoken");
// const User = mongoose.model("User", {
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true },
// });

// const Role = mongoose.model("Role", {
//   name: { type: String, required: true },
// });
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
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = Login;
