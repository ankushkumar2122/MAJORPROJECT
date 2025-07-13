const express = require("express");
const router = express.Router();


//index route for user
router.get("/", (req, res) => {
    res.send("get for user");
});

//show route
router.get("/:id", (req, res) => {
    res.send("get for  show user");
});

//post user
router.post("/", (rq, res) => {
    res.send("post req");
});

//delete
router.delete("/:id", (req, res) => {
    res.send("deleted for user");
});

module.exports = router;