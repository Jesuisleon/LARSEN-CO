const jwt = require("jsonwebtoken");
const Salesman = require("../models/salesman");

const verifyToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedToken;
    const salesman = await Salesman.findOne({ _id }).select("_id isAdmin");
    if (!salesman) {
      throw new Error("Salesman not found");
    }
    return salesman;
  } catch (err) {
    throw new Error(err.message);
  }
}

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Authorization token required" })
  }

  try {
    const salesman = await verifyToken(token);
    req.salesman = salesman;
    next();
  }
  catch (err) {
   return res.status(401).json({ error: err.message });
  }
};

const requireAdmin = (req, res, next) => {
    const isAdmin = req.salesman.isAdmin;
    if (!isAdmin) {
       return res.status(401).json({ error: "You are not authorized" });
    }
    next();
};

module.exports = { requireAuth, requireAdmin };
