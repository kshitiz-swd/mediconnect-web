
const {register, login, getAUser, getUsers} = require('../services/userService');
const generateToken = require('../../utils/tokenUtil')


const registerUser = async (req, res) => {
  try {
    const user = await register(req.body);
    
    const token = generateToken({ id: user._id, emailId: user.emailId });

    res.cookie('access-token', token, {
      secure: true, 
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const { token, user } = await login({ emailId, password });

    res.cookie('access-token', token, {
        secure: true, 
        sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('access-token');
  res.status(200).json({ message: "Logged out successfully" });
};


  const getUserProfile = async (req, res) => {
    try {
        const { emailId } = req.user;
        const user = await getAUser(emailId);
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getUsers();
    res.status(200).json({ message: "All Users", users: allUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  registerUser, loginUser, getUserProfile, getAllUsers, logoutUser
};

