const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
<<<<<<< HEAD
const wrapasync = require("../utils/wrapasyc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontrooler=require("../controllers/users.js");


router.route("/signup")
.get( usercontrooler.renderSignupForm)
.post(
wrapasync(usercontrooler.signup));


router.route("/login")
.get(usercontrooler.renderLoginForm)
.post(
    saveRedirectUrl,
     passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),
usercontrooler.login
);


=======
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
>>>>>>> ef424c4 (database uri change)
router.get("/logout", usercontrooler.logout );


module.exports = router;
