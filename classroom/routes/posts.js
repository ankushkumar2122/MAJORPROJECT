const express = require("express");
const router = express.Router();


//index route for user
router.get("/", (req, res) => {
    res.send("get for posts")
});
//show route
router.get("/:id", (req, res) => {
    res.send("get for  show posts");
});

//post user
router.post("/", (rq, res) => {
    res.send("post req for posts");
});
//delete
router.delete("s/:id", (req, res) => {
    res.send("deleted for posts");
});
module.exports=router;