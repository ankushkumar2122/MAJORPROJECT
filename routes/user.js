const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const passport = require("passport")
const wrapasync = require("../utils/wrapasyc.js");
const { saveRedirectUrl } = require("../middleware.js");
const usercontrooler=require("../controllers/users.js");

router.route("/signup")
.get( usercontrooler.renderSignupForm)
.post( wrapasync(usercontrooler.signup));

router.route("/login")
.get(usercontrooler.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {

    failureRedirect: "/login",
    failureFlash: true,
}),


usercontrooler.login
);
router.get("/logout", usercontrooler.logout );


module.exports = router;
