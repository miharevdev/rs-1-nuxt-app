const Router = require("express");
const router = new Router();
const authController = require("../controllers/auth.controller.js");

const authMiddleware = require("../middlewares/auth-middleware.js");
const {body} = require("express-validator");

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    authController.registration
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/auth_user', authMiddleware, authController.getUser);

module.exports = router;