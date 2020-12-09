const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const app = express();
const flash = require('connect-flash');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

app.use(flash());

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, email, age, location, password } = req.body;
        const user = new User({ username, email, age, location, img: '3f.jpg' });
        const registeredUser = await User.register(user, password);
        console.log('User has been registered!')
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to gitActive!');
            res.redirect(`/profile/${registeredUser.id}`);
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/');
    }
}))

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/' }), async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.params.id)

    req.flash('success', 'Welcome back!');
    res.redirect('/community');
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})



module.exports = router;