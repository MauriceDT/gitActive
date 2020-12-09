const handleAsync = require('../utils/handleAsync');
const User = require('../models/user');

module.exports.index = handleAsync(async (req, res) => {
    const users = await User.find({});
    res.render('community', { users });
});

module.exports.index2 = handleAsync(async (req, res) => {

    User.count().exec(function (err, count) {
        const random = Math.floor(Math.random() * count)
        User.findOne().skip(random).exec(
            function (err, result) {
                const users = [];
                users.push(result);
                res.render('community', { users });
            })
    })
});

module.exports.index2 = handleAsync(async (req, res) => {

    User.count().exec(function (err, count) {
        const random = Math.floor(Math.random() * count)
        User.findOne().skip(random).exec(
            function (err, result) {
                const users = [];
                users.push(result);
                res.render('community', { users });
            })
    })
});


module.exports.show = handleAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        // req.flash('error', 'Cannot find that user!');
        return res.redirect('/community')
    }
    res.render('profile', { user })
});