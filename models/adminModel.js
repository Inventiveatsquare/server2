const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  
  role: {
    type: String,
    default: 'client',
    enum: ["client", "merchant", "admin"]
  },
  accessToken: {
    type: String
  }
})

const Admin = mongoose.model('Admin', UserSchema)

module.exports = Admin;