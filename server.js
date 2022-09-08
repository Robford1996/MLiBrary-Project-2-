
require('dotenv').config()

//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const mongoURI = process.env.MONGODB_URI
const teams = require("./models/mlb.js")
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//ROUTES / CONTROLLERS
//SEED


//INDEX
app.get("/teams", (req, res)=>{
  teams.find({}, (error, allTeams)=>{
    res.render("index.ejs", {
      teams: allTeams,
    });
  });
});

//NEW
app.get("/teams/new", (req, res)=>{
  res.render("new.ejs");
});

//DELETE
app.delete("teams/:id", (req, res)=>{
  teams.findByIdAndDelete(req.params.id, (err, data)=>{
    res.redirect("/teams")
  })
})

//UPDATE
app.put("teams/:id", (req, res)=>{
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
app.post("/teams", (req, res)=>{
  teams.create(req.body, (error, createdTeam)=>{
    res.redirect("/teams")
  })
})

//EDIT
app.get("teams/:id/edit", (req, res)=>{
  teams.findById(req.params.id, (error, foundTeam)=>{
    res.render("edit.ejs", {
      team: foundTeam,
    })
  })
})

//SHOW
app.get("teams/:id", (req, res)=>{
  teams.findById(req.params.id, (err, foundTeam)=>{
    res.render("show.ejs", {
      team: foundTeams,
    })
  })
})

//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));

