const { Magic } = require("@magic-sdk/admin");

const User = require("../model/UserModel");
require("dotenv").config();

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

// register user
module.exports.register = async (req, res) => {
  const { email, firstname, lastname } = req.body;
  try {
    const user = await User.findOne({
      email,
      firstname,
      lastname,
    });
    if (user) {
      return res.status(400).send("User already exists");
    }

    await newUser.save();
    return res.status(201).send("User created successfully");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// check if user exists in DB
module.exports.check = async (req, res) => {
  const { email } = req.body;
  const adminEmail = process.env.ADMIN_CREDENTIAL;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
      });
    } else {
      if (email === adminEmail) {
        return res.status(400).json({
          status: true,
          admin: true,
        });
      } else {
        return res.status(200).json({
          status: true,
          admin: false,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// login user
module.exports.login = async (req, res) => {
  try {
    const didToken = req.headers.authorization.substring(7);
    await magic.token.validate(didToken);
    const issuer = await magic.token.getIssuer(didToken);
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({ message: "User doesnot exist" });
    }

    // update the magic id
    ser.magicId = issuer;
    await user.save();
    return res.status(200).json({ authenticated: true });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
