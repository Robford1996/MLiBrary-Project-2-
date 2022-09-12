const express = require("express")
const router = express.Router()
const National = require("../models/national.js")

//INDEX
router.get("/", (req, res) => {
  National.find({}, (err, foundNationals) => {
    res.render("national/index.ejs", {
      nationals: foundNationals
    })
  })
})

//NEW
router.get("/new", (req, res) => {
  res.render("national/new.ejs")
})

//DELETE
router.delete("/:id", (req, res) => {
  National.findByIdAndDelete(req.params.id, () => {
    res.redirect("/national")
  })
})

//UPDATE
router.put("/:id", (req, res) => {
  if (req.body.eliminated === "on") {
    req.body.eliminated = true
  } else {
    req.body.eliminated = false
  }
  National.findByIdAndUpdate(req.params.id, () => {
    res.redirect("/national")
  })
})

//CREATE
router.post("/", (req, res) => {
  if (req.body.eliminated === "on") {
    req.body.eliminated = true
  } else {
    req.body.eliminated = false
  }
  National.create(req.body, (err, createdNational) => {
    res.redirect("/national")
  })
})

//EDIT
router.get("/:id/edit", (req, res) => {
  National.findById(req.params.id, (err, foundNational) => {
    res.render("national/edit.ejs", {
      national: foundNational
    })
  })
})

//SHOW
router.get("/:id", (req, res) => {
  National.findById(req.params.id, (err, foundNational) => {
    res.render("national/show.ejs", {
      national: foundNational
    })
  })
})

module.exports = router