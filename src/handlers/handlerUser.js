const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const registerHandler = async (request, h) => {
  const { email, password } = request.payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return h.response({ message: "Email already exists" }).code(400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  return h.response({ message: "User registered successfully" }).code(201);
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  const user = await User.findOne({ email });
  if (!user) {
    return h.response({ message: "Invalid credentials" }).code(401);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return h.response({ message: "Invalid credentials" }).code(401);
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return h.response({ token }).code(200);
};

module.exports = { registerHandler, loginHandler };
