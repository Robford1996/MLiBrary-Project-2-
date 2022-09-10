//Dependencies
const express= require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const americanController = require("./controllers/american.js")
const nationalController = require("./controllers/national.js")


//Middleware
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use("/american", americanController)
app.use("/national", nationalController)

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});


const db = mongoose.connection
db.on("error", (err)=> console.log(err.message + "is mongod not running?"))
db.on("connected", ()=> console.log("mongo connected"));
db.on("disconnected", ()=>console.log("mongo disconnected"));

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

//Listener
app.listen(3000, ()=>{
    console.log("listening...")
})