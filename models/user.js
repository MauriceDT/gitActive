const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    img: String,
    timeactive: Number
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);