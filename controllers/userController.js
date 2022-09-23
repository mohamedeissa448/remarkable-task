import User from './../models/userModel';
import APIFeatures from '../utils/apiFeatures';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const updateMe = async (req, res) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return res.status(400).json({
      status: 'failed',
      message: 'This route is not for password updates. Please use /updateMyPassword.'
    });
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
};

const deleteMe = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
};



const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: 'No user found with that ID.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
};
const getAllUsers = async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
};

// Do NOT update passwords with this!
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: 'No user found with that ID.'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: 'No user found with that ID.'
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
};

export {updateMe, deleteMe, getUser, getAllUsers, updateUser, deleteUser}