const express = require("express");
const {HandleUserSignUp,
    HandleUserLogin,
} = require("../controllers/user")
const router = express.Router();

router.route("/")
.post(HandleUserSignUp) 

router.route("/login")
.post(HandleUserLogin)


module.exports = router;