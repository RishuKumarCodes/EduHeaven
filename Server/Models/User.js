const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true, // Ensures that userId is always present
    unique: true, // Ensures that each user has a unique ID
  },
  userName: {
    type: String,
    required: [true, 'Username is required'],
    unique: true, // Ensures that usernames are unique
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'], // Regex for valid username format
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'], // Enforces minimum password length
  },
  profileImage: {
    type: String,
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Invalid URL format for profile image'], // Ensures the URL is valid
    default: '', // Optional field (can be empty)
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    maxlength: [100, 'Location can\'t be more than 100 characters'], // Limit the length
  },
  graduationYear: {
    type: Number,
    required: [true, 'Graduation Year is required']
  },
  job: {
    type: String,
    maxlength: [100, 'Job title can\'t be more than 100 characters'], // Limits job title length
    default: '', // Optional field (can be empty)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema)
module.exports = {
  User
}


