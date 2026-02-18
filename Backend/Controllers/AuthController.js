const UserModel = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ================= SIGNUP =================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      success: true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      success: false
    });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      success: true,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      success: false
    });
  }
};

module.exports = { signup, login };
