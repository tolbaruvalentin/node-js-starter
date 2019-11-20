const
    express = require('express'),
    app = express(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    mongoURL = 'mongodb://localhost/webportal',
    mongoStore = require('connect-mongodb-session')(session),
    csrf = require('csurf');

app.use(express.urlencoded({ extended: false }));

const
    indexRoute = require('./routes/index-routes'),

    authRoutes = require('./routes/auth');

app.set('view engine', 'ejs'); // setting ejs as protocol
app.set('views', 'views'); // setting views to be showened in views folder 

/**
 *  configurating session
 * 
 */
const store = new mongoStore({
    uri: mongoURL,
    collection: 'session'
})

app.use(session({
    secret: 'Myapp',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
    store: store
}));

/**
 *  CSRF settings
 */
const csrfProtection = csrf();
app.use(csrfProtection);

/**
 *  reusable local variables into views
 */
app.use((req, res, next) => {

    res.locals.isAuth = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});


/*
 adding routes
*/
app.use(indexRoute); 
app.use(authRoutes);

const
   PORT = process.env.PORT || 5000;


/**
*  start the port with mongoose database
*/
mongoose.connect(mongoURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    })
    .catch(err => console.log(err));