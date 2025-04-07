const express = require("express")
// const userrouter = require("./routes/user")
const path = require("path")
const urlrouter = require("./routes/url")
const userRouter = require("./routes/user")
const staticrouter = require("./routes/staticRouter")
const {connectDb} = require("./connection")
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUserOnly,
    checkAuth,
} = require("./middlewares/auth")

// const user = require("./models/user")
const app = express();

const PORT = 3000;

//connection 
connectDb("mongodb://127.0.0.1:27017/Url-shortener");


app.set('view engine' , "ejs")
app.set('views',path.resolve("./views"))
// // middelware
app.use(express.urlencoded({extended: false})) 
app.use(express.json())
app.use(cookieParser())


// //routers
app.use("/url",restrictToLoggedInUserOnly, urlrouter)
app.use("/" ,checkAuth, staticrouter)
app.use("/user", userRouter)


// //listen the server
app.listen(PORT , ()=>{
    console.log(`server is listen at port ${PORT}`)
})