const
    User = require('../models/users'),
    bcrypt = require('bcryptjs'),
    session = require('express-session'),
    { validationResult } = require('express-validator');

/**
 *  @method GET
 *  @url /login
 *  @route  auth.js
 *  @description - shows login form
 */

exports.getLoginPage = (req, res, next) => {

    res.render('auth/login', {
        pageTitle: 'Login',
        errors: []
    });
};
/**
 *  @method GET
 *  @url /dashboard
 *  @route auth.js
 *  @description - the user dashboard homepage after it is logged in
 */
exports.getDashboardPage = (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    // console.log(req.session.user._id);
    res.render('auth/dashboard', {
        pageTitle: 'Dashboard',
        userEmail: req.session.user.email
    });
};

/**
 *  @method GET
 *  @url  /sign-up
 *  @route  auth.js
 *  @description - shows sign up form
 */
exports.getSignUpPage = (req, res, next) => {
    res.render('auth/sign-up', {
        pageTitle: 'Sign Up',
        errors: []
    });
};

/**
|    POST REQUEST
|    POST REQUEST
|    POST REQUEST
*/
//////////////////////////////

/**
 * @method POST
 * @route auth.js
 * @url /login
 * @description - gets data from login form and compares it
 */
exports.saveLogin = (req, res, next) => {
    let hass = "";
    const
        email = req.body.email,
        password = req.body.password,
        hashPass = bcrypt.hashSync(password, 12);



    // verify user by email
    User.findOne({ email: email })
        .then(user => {
            console.log(user);
            if (!user) {
                return res.redirect('/login');
            }

            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save(err => {

                        return res.redirect('/dashboard');
                    });
                })
        })
        .catch(err => console.log(err));

};

/**
 *  @method POST
 *  @route auth.js
 *  @url /logout
 *  @description - logout the usr from account
 */

exports.postLogout = (req, res, next) => {

    if (req.session.isLoggedIn) {
        req.session.destroy(() => {
            return res.redirect('/');
        });
    }
};


/**
 * @method POST
 * @route auth.js
 * @url /sign-up
 * @description - gets data from sign-up form and creates user
 */

exports.saveSignUp = (req, res, next) => {
    const
        email = req.body.email,
        password = req.body.password,
        errors = validationResult(req);

    // check validation pass
    if (!errors.isEmpty()) {

        return res
            .status(422)
            .render('auth/sign-up', {
                pageTitle: 'Sign Up',
                errors: errors.array()
            });
    }

    // first find if email exists
    User.find({ email: email })
        .countDocuments()
        .then(result => {
            if (result === 1) {

                // return res.redirect('/login');
                return res
                    .status(200)
                    .render('auth/sign-up', {
                        pageTitle: 'Login',
                        erorrs: []

                    });

            } else {
                return bcrypt
                    .hash(password, 12)
                    .then(hash => {
                        // save to the database
                        const
                            user = new User({
                                email: email,
                                password: hash
                            });
                        user
                            .save()
                            .then(result => {
                                req.session.isLoggedIn = true;
                                req.session.user = user;
                                req.session.save(err => {
                                    return res.redirect('/dashboard');
                                });
                            })
                            .catch(err => console.log(err));
                    });
            }
        })
        .catch(err => console.log(err));


};