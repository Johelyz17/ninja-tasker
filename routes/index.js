const express = require("express");
const db = require("../models/index");
const routes = express.Router();
const passport = require("../config/passport")

// let list = ["code and watch anime", "Slackline tonight"];

// ROUTES 
// GET home
routes.get("/home", function(req, res) {
    db.Tasks.findAll({
        attributes: ['id', 'todo']
      }).then (function(results){
        console.log(results);
        res.render("index.ejs", { list: results });
      });
});

// POST /ninja
routes.post("/ninja", function(req, res) {
    console.log(req.body.taskItem);
    db.Tasks.create({
        todo: req.body.taskItem
    }).then(function(results){
        // console.log(results);
        res.redirect("/home");
    });
});

routes.delete("/delete/:index", function(req, res) {
    // console.log(req.params.index);
    db.Tasks.destroy({ 
        where: { id: req.params.index } 
    }).then(function(results) {
        // console.log(results);
        res.redirect("/home");
        res.json(results);
    });
});

// ROUTES: users

// GET login
routes.get("/user/login", function(req, res) {
    res.render("login.ejs");
});

// POST login
routes.post(
    "/user/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/user/login"
 })
);

// GET signup
routes.post(
    "/user/signup",
    passport.authenticate("local-signup",{ 
     successRedirect: "/home",
     failureRedirect: "/user/signup"
    })
);
    

// POST signup
routes.get("/user/signup", function(req, res) {
    console.log("hitting post signup");
});
module.exports = routes;
