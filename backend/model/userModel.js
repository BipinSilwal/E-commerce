import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide userName'],
    minLength: [5, 'Your name cannot be less than 5 characters'],
    maxLength: [30, 'Your name cannot exceed 30 characters'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: [validator.isEmail, 'Please provide unique email '],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, 'Your password must be longer than 6 characters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {
  // if password is changed then we shouldn't hash again as client password and token doesn't get verified
  // modified helps to send the client password to be checked in the database with token
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  // jwt helps to create token..
  // userId helps for authentication and authorization.
  // we create req.user which can be accessed by the middleware.
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_DATE,
  });
};

userSchema.methods.comparePassword = async function (clientPassword) {
  // comparing client password with database stored password
  return await bcrypt.compare(clientPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
