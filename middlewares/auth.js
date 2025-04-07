const { getUser } = require("../service/auth")




async function restrictToLoggedInUserOnly(req, res, next) {
    try {
        const useruid = req.cookies?.uid;
        if (!useruid) {
            return res.redirect(302, "/login");
        }
         const usergot = getUser(useruid);
        if (!usergot) {
            return res.redirect(302, "/login");
        }
        req.user = usergot;
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}
async function checkAuth(req,res,next) {
    const useruid = req.cookies?.uid;
    
    const usergot = getUser(useruid);
        req.user = usergot;
        
        next();
}
module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}