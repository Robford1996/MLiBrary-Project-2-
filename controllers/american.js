const express = require("express")
const router = express.Router()
const American = require("../models/american.js")

//INDEX

router.get("/", (req, res)=>{
    American.find({}, (err, foundAmericans)=>{
        res.render("american/index.ejs", {
            americans: foundAmericans
        })
    })
})

//NEW
router.get("/new", (req, res)=>{
    res.render("american/new.ejs")
})

//DELETE
router.delete("/:id", (req, res)=>{
    American.findByIdAndDelete(req.params.id, (err, data)=>{
        res.redirect("/american")
    })
})

//UPDATE
router.put("/:id", (req, res)=>{
    if(req.body.eliminated === "on"){
        req.body.eliminated = true
    }else{
        req.body.eliminated = false
    }
    American.findByIdAndUpdate(req.params.id, req.body, ()=>{
        res.redirect("/american")
    })
})

//CREATE
router.post("/", (req, res)=>{
    if (req.body.eliminated === "on"){
        req.body.eliminated = true
    }else{
        req.body.eliminated = false
    }
    American.create(req.body, (err, createdAmerican)=>{
        res.redirect("/american")
    })
})

//EDIT
router.get("/:id/edit", (req, res)=>{
    American.findById(req.params.id, (error, foundAmerican)=>{
        res.render("american/edit.ejs", {
            american: foundAmerican
        })
    })
    })

//SHOW
router.get("/:id", (req, res)=>{
    American.findById(req.params.id, (err, foundAmerican)=>{
        res.render("american/show.ejs", {
            american: foundAmerican
        })
    })
})

module.exports = router