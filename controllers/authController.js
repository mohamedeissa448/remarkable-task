import  { promisify } from 'util';
import  jwt from 'jsonwebtoken';
import  User from './../models/userModel';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';

const signToken = id => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

const signup = async (req, res) => {
 
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName, 
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    buildingNumber: req.body.buildingNumber,
    street: req.body.street,
    district: req.body.district,
    city: req.body.city,
    country: req.body.country,
    mobileNumber: req.body.mobileNumber
  }); 

  createSendToken(newUser, 201, req, res);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: 'failed',
      message: 'Please provide email and password!'
    });
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'failed',
      message: 'Incorrect email or password!'
    });
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
};

const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
};

const protect = async (req, res) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: 'failed',
      message: 'You are not logged in! Please log in to get access.'
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: 'failed',
      message: 'The user belonging to this token does no longer exist.'
    });
  }


  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  return true;
};



export {signup, login, logout, protect}
