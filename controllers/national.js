const express = require("express")
const teamsRouter = express.Router()
const teams = require("../models/mlb.js")

//INDEX
teamsRouter.get("/", (req, res)=>{
    teams.find({}, (error, allTeams)=>{
      res.render("index.ejs", {
        teams: allTeams,
      });
    });
  });
  
  //NEW
  teamsRouter.get("/new", (req, res)=>{
    res.render("new.ejs");
  });
  
  //DELETE
  teamsRouter.delete("/:id", (req, res)=>{
    teams.findByIdAndDelete(req.params.id, (err, data)=>{
      res.redirect("/teams")
    })
  })
  
  //UPDATE
  teamsRouter.put("/:id", (req, res)=>{
    // if(req.body.league ===)
    teams.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedTeams)=>{
        res.redirect(`/teams/${req.params.id}`)
      }
    )
  })
  
  //CREATE
  teamsRouter.post("/", (req, res)=>{
    teams.create(req.body, (error, createdTeam)=>{
      res.redirect("/teams")
    })
  })
  
  //EDIT
  teamsRouter.get("/:id/edit", (req, res)=>{
    teams.findById(req.params.id, (error, foundTeam)=>{
      res.render("edit.ejs", {
        team: foundTeam,
      })
    })
  })
  
  //SHOW
  teamsRouter.get("/:id", (req, res)=>{
    teams.findById(req.params.id, (err, foundTeam)=>{
      res.render("show.ejs", {
        team: foundTeam,
      })
    })
  })

  module.exports = teamsRouter