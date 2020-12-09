const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username: String,
    email: String,
    location: String,
    age: Number,
    password: String
})

module.exports = mongoose.model('Profile', ProfileSchema);