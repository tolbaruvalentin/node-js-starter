
/**
 *  @routes auth.js
 */
const
    express = require('express'),
    router = express.Router(),
    { check, body } = require('express-validator'),
    isAuth = require('../middlewares/isAuth'),
    userController = require('../controllers/authController');


router.get('/login', userController.getLoginPage);
router.get('/sign-up', userController.getSignUpPage);
router.get('/dashboard', isAuth, userController.getDashboardPage);

//// Route post requests
router.post('/login',
    [
        check('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Adresa de email este invalida'),
        body('password')
            .isLength({ min: 5 })
            .withMessage('Parola trebuie sa contina minim 4 caractere')
            .isAlphanumeric()
            .withMessage('Parola trebuie sa fie alfanumerica')
    ]
    , userController.saveLogin);

router.post('/logout', isAuth, userController.postLogout);
router.post('/sign-up',
    [
        check('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Adresa de email este invalida'),
        body('password')
            .isLength({ min: 5 })
            .withMessage('Parola trebuie sa contina minim 4 caractere')
            .isAlphanumeric()
            .withMessage('Parola trebuie sa fie alfanumerica')
    ]
    , userController.saveSignUp);

module.exports = router;
