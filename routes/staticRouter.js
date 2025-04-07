const express = require("express")
const router = express.Router();
const {deleteUrl} = require("../controllers/url")

const URL = require("../models/url");

router.route("/")
.get(async (req,res)=>{
    if (!req.user) {
        return res.redirect("/login")
    }
    const allurls = await URL.find({createdBy:req.user._id});
    if (!allurls ||  allurls.length === 0) {
        return res.render("home");
    }
        return res.render("home", {
            allurl :allurls,
        });
})
router.post("/delete-url",deleteUrl)

router.get("/signup",async (req,res)=>{
    return res.render("SignUp")
})
router.get("/login",async (req,res)=>{
    return res.render("login")
})
router.get("/url", async (req,res)=>{
    const allurls = await URL.find({createdBy:req.user._id});
    if (!allurls ||  allurls.length === 0) {
        return res.render("home");
    }
        return res.render("home", {
            allurl :allurls,
        });
})

module.exports = router