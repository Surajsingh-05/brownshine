const express = require("express");
const router = express.Router();
const  handlar = require("../controllers/auth-controller");
const {signupSchema , loginSchema} = require("../validators/auth-validators")
const validate = require("../middlewares/validate-middleware")
const authMiddleware = require("../middlewares/auth-middleware")

router.route('/').get(handlar.home)  
router.route('/register').post(validate(signupSchema), handlar.register);
router.route('/login').post(validate(loginSchema),handlar.login);


router.route('/user').get(authMiddleware, handlar.user);

module.exports = router;

