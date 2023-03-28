const { validationResult } = require("express-validator");
const User = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    // Validation from the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.mapped() });
    }
    // Verify the existence of the account
    const { lastName, firstName, urlImg, email, password } = req.body;
    const found = await User.findOne({ email });

    if (found) {
      return res
        .status(401)
        .json({ message: " You have Already registred ! " });
    }

    // Creation
    // Crypt

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save data to DB
    const newUser = await User.create({
      lastName,
      firstName,
      urlImg,
      email,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const Login = async (req, res) => {
  try {
    // validation from the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.mapped() });
    }

    // Check if the user exists or not
    const { email, password } = req.body;
    const found = await User.findOne({ email });
    if (!found) {
      return res.status(402).json({ message: "You have to register first" });
    }
    // Check for password
    const isMatched = await bcrypt.compare(password, found.password);
    if (!isMatched) {
      return res.status(403).json({ message: "Wrong email or password" });
    }
    // generate a key : token
    const token = await jwt.sign({ id: found._id }, process.env.SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ token, found });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      }
    ).select("-password");
    res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// const AddPostUser = async(req,res)=>{
//     try {
//         const {id} = req.params ;
//         const ReqUser = await User.findById({id})
//         const addPostToUser = await User.updateOne
//     } catch (error) {

//     }
// }

module.exports = { Register, Login, updateUser };
