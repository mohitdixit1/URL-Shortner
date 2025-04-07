const {v4:uuidv4} = require("uuid")
const user = require("../models/user")
const {setUser,
    getUser,
} = require("../service/auth")

async function HandleUserSignUp(req,res) {
    const {name ,email,password} = req.body
    await user.create({
        name,
        email,
        password,
    })
    return res.redirect("/")
}
async function HandleUserLogin(req,res) {
    const {email,password} = req.body;
    const userfinded = await user.findOne({email,password})
    if (!userfinded) {
        return res.render("login" , {
            error:"Invalid username or password"
        })
    }
    const token = setUser(userfinded);
    res.cookie("uid",token)

    return res.redirect("/")
 
}

module.exports = {
    HandleUserSignUp,
    HandleUserLogin,

}