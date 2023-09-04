const Salesman = require("../models/salesman");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Salesman.login(email, password);
    if (!user) throw new Error("User not found");

    // JWT token
    const token = createToken(user._id);
     res.cookie("jwt", token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 1000 * 60 * 60 * 24 });

    if (user.isAdmin) {
      res.json({ id: user._id, name: user.name, email: user.email, isAdmin: true });
    } else {
    res.json({ id: user._id, name: user.name, email: user.email });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "User logged out" });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await Salesman.register(name, email, password);
    if (!user) throw new Error("User not created");

    // JWT token
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 1000 * 60 * 60 * 24 });

    if (user.isAdmin) {
      res.status(201).json({ id: user._id, name: user.name, email: user.email, isAdmin: true });
    } else {
    res.status(201).json({ id: user._id, name: user.name, email: user.email});
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
