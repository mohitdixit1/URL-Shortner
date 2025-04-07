const jwt = require("jsonwebtoken")
const SecretKey = "Mohit@$123*"



function setUser(user) {
   return jwt.sign({
        _id:user._id, 
        email:user.email,
    },SecretKey)
}
function getUser(token) {
    if(!token) return null;
    try {
        
    return jwt.verify(token,SecretKey);
    } catch (error) {
        return null; 
    }
}
module.exports = {
    setUser,
    getUser,
}