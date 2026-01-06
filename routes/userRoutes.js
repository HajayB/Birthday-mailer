const {registerUser} = require("../controller/userController");

const express  = require("express");

const router = express.Router();


router.post('/signup', registerUser);


module.exports = router;