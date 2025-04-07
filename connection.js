

const mongoose = require("mongoose")

async function connectDb(url) {
    
mongoose.connect(url)
.then(()=>{console.log("mongoose connected")})
.catch((err)=>{console.log(`errr in  mongoose ${err}`)})
    
}
module.exports = {connectDb};