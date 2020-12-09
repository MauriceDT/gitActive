const mongoose = require('mongoose');
const { fnames, mnames, lastnames, places } = require('./seedHelpers');
const User = require('../models/user');
const passport = require('passport');

mongoose.connect('mongodb://localhost:27017/pr-1-test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await User.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const randomage = Math.floor(Math.random() * 90) + 16;
        const user = new User({
            location: sample(places),
            age: randomage,
            email: `user${i + 1}@example.com`,
            timeactive: Math.floor(Math.random() * 30) * 10,
        })
        const isMale = Math.floor(Math.random() * 2);
        const photonum = Math.floor(Math.random() * 3) + 1;
        if (isMale === 0) {
            user.username = `${sample(mnames)} ${sample(lastnames)}`;
            user.img = `${photonum}m.jpg`;
        } else {
            user.username = `${sample(fnames)} ${sample(lastnames)}`;
            user.img = `${photonum}f.jpg`;
        }
        const registeredUser = await User.register(user, 'secret');
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});