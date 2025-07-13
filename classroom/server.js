const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/posts.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


// const cookieParser=require("cookie-parser");
// app.use(cookieParser("secretcode"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.get("/getcookies",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookies send");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(` hi ${name}`);
// });
// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("send your cookies");

// });

// app.get("/",(req,res)=>{
// console.dir(req.cookies);
// res.send(" hi iam root");

// });




// app.use("/users",users);
// app.use("/posts",posts);

// /users
// /users/:id
// /users/new

const sessionOption = {
    secret: "mysupersecretestring",
    resave: false,
    saveUninitialized: true,
};


app.use(session(sessionOption));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.succesmsg=req.flash("succes");
    res.locals.errorMsg=req.flash("error");
    next();
});


app.get("/register", (req, res) => {
    let { name = "Ankush" } = req.query;
    req.session.name = name;
    
    if(name === "Ankush"){
        req.flash("error", "user not registered!");
    }
    else {
        req.flash("succes", "user rigister succesfully!");
    }

    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    // console.log(req.flash("successs"));

    res.render("page.ejs", { name: req.session.name });
});
// app.get("/reqcount",(req,res)=>
// {
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }

//     res.send(`you send a request ${req.session.count} times`);
// });

app.get("/test", (req, res) => {
    res.send("test successful");
});



app.listen(3000, () => {
    console.log("server is listening to 3000");
});