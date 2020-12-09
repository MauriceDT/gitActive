/*
    ---------------------------------------------------------------------------
    @Basic Skeleton for any JS/Express application
    @v0.1
    @Toby Versteeg
    @CodeGorilla
    @december 2020

    This is a 'basic' skeleton (boilerplate) for any JS project.
    It uses Express, MongoDB, Mongoose and EJS templating and more libs.
    This boilerplate includes Bootstrap and jQuery as well to have a quick
    start on building responive websites.
    The folder structure is a basic setup to write clean code and seperates
    files into common folders like public/css, views, controllers, models etc.s
    ---------------------------------------------------------------------------
*/

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const ExpressError = require('express-error');
const mongoSanitize = require('express-mongo-sanitize');
const MongoDBStore = require("connect-mongo")(session);
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");

//Zelf nog toegevoegd ((Maurice di Tolve)):
//Zelf nog toegevoegd ((Maurice di Tolve)): 
//Zelf nog toegevoegd ((Maurice di Tolve)):  
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const userControl = require('./controllers/user.js');

const userRoutes = require('./routes/users')
const methodOverride = require('method-override');
const sessionOptions = {
    secret: 'gitActiveIsGewoonEenWandelApp',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
const flash = require('connect-flash');




// using a database?
// uncomment the code below and rename "myDB" into your own database
mongoose.connect('mongodb://localhost:27017/pr-1-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('db connected');
}).catch(err => {
    console.log(err);
});

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

// set public folder to include CSS and JS in your main template
// like href="css/main.css"
// see index.ejs template
app.use(express.static(__dirname + '/public'));

// paths for including Bootstrap, jQuery and Popper
// from the node_modules folder
// and include them like href="/css/bootstrap.min.css"
// or JS like src="/js/bootstrap.min.js"
// see index.ejs template
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));

// retrieve data from posts in JSON format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Zelf toegevoegd door ((Maurice di Tolve)):
//Zelf toegevoegd door ((Maurice di Tolve)):
//Zelf toegevoegd door ((Maurice di Tolve)):
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', userRoutes);
app.use(methodOverride('_method'));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// put your routes here
app.get('/', (req, res) => {
    res.render('layouts/index')
});

app.get('/profile/:id', userControl.show)
// app.get('/community', userControl.index)
app.get('/community', userControl.index)
app.get('/community2', userControl.index2)


//Zelf toegevoegd door ((Maurice di Tolve)):
//Zelf toegevoegd door ((Maurice di Tolve)):
//Zelf toegevoegd door ((Maurice di Tolve)):
// app.get('/profile', async (req, res) => {

//     res.render('layouts/profile')
// })

// app.get('/profile/:id', async (req, res) => {
//     const user = await User.findById(req.params.id)
//     res.render('layouts/profile', { user });
// })

app.get('/profile/:id/edit', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.render('layouts/edit', { user });
})

app.put('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { ...req.body.user });
    req.flash('success', 'Successfully updated User');
    res.redirect(`/profile/${user._id}`);
})

app.delete('/profile/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'User was successfully deleted')
    res.redirect('/');
})

// set up a port for your localhost
app.listen(8080, () => {
    console.log('Hi! :-) I\'m listening to port 8080')
});