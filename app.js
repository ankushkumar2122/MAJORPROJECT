const express = require('express');
const app = express(); 
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingrouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrtegy = require("passport-local");
const user = require("./models/user.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


main().then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL)
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    Cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,//1 week expiry date
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrtegy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
// basic api
app.get("/", (req, res) => {
    res.send("hi i am root");
});


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    console.log(res.locals.success);
    next();
});
// app.get("/demouser",async(req,res)=>{
// let fakeUser=new user({
//     email:"studentgmail.com",
//     username:"student"
// });
// let registerUser = await user.register(fakeUser,"helloworld");
// res.send(registerUser);
// })

app.use("/listings", listingrouter); // This is correct
app.use("/listings/:id/reviews", reviewRouter); // This is also correct
app.use("/", userRouter);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});
app.use((err, req, res, next) => {
    let { statuscode = 500, message = "Something went wrong!" } = err;
    // res.status(statuscode).send(message);
    res.status(statuscode).render("error.ejs", { message });
    // res.send("somthing went wrong");
});
app.listen(8080, () => {
    console.log("server is listning to port 8080");//server
});