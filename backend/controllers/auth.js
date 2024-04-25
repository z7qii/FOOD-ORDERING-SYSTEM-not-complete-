import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ResturantOwner from "../models/resturantOwner.js";

export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const newResturantOwner = new ResturantOwner({
      email: req.body.email,
      password: passwordHash,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
    });

    const savedOwner = await newResturantOwner.save();
    res.status(200).json(savedOwner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await ResturantOwner.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    const isMathed = await bcrypt.compare(password, user.password);
    if (!isMathed)
      return res.status(400).json({ msg: "Invalid credentials. " });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
