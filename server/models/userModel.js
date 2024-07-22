const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 25,
    },
    profilePhoto: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    }
}, { timestamps: true });

const User = mongoose.model('User', UserModel)
module.exports = User
