const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const validator = require("validator");

const SalesmanSchema = new Schema({
  name: { type: String, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  avatar: { type: String },
  isAdmin: { type: Boolean, default: false },
});

SalesmanSchema.statics.login = async function (email, password) {
  if (!email || !password) throw new Error("Email and password required");

  const user = await this.findOne({ email });
  if (!user) throw new Error("Incorrect email or password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Incorrect email or password");

  return user;
}

SalesmanSchema.statics.register = async function (name, email, password) {
  if (!email || !password) throw new Error("Email and password required");

  // check if email is valid
  const validEmail = validator.isEmail(email);
  if (!validEmail) throw new Error("Email is not valid");

  // check if email already exists
  const exists = await this.findOne({ email });
  if (exists) throw new Error("Email already exists");

  // check if password is strong enough
  const validPassword = validator.isStrongPassword(password);
  if (!validPassword) throw new Error("Password is not strong enough");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hashedPassword });

  return user;
};

module.exports = mongoose.model("Salesman", SalesmanSchema);
