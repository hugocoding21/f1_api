const { comparePassword } = require("../middlewares/hashPassword");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Entrer un mail et mot de passe" });
  }

  try {
    const newUser = new User({ email, password });
    let user = await newUser.save();
    res.status(201).json({ message: `Utilisateur crée: ${user.email}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur server" });
  }
};

const getAll = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Erreur server" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passeword requis" });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Invalide email ou mot de passe" });
    }
    const isCorrect = await comparePassword(password, user.password);

    if (isCorrect) {
      const userData = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const token = await jwt.sign(userData, process.env.JWT_KEY, { expiresIn: "10h" });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Email ou mot de passe invalide" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur server" });
  }
};

module.exports = { register, login, getAll };
