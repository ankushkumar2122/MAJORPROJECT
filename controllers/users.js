<<<<<<< HEAD
    const user = require("../models/user");

=======
const user = require("../models/user.js");
>>>>>>> ef424c4 (database uri change)
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;  // Corrected 'passsword' to 'password'
        const newuser = new user({ email, username });//it shows in database
        const registerUser = await user.register(newuser, password);  // Corrected 'passsword' to 'password'  //it show in login page
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "User was registered successfully");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "welcome back Wandurlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged out");
        res.redirect("/listings");
    });
};