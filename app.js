// packages
const express= require("express")
const bodyParser = require("body-parser");

// starting express app
const app = express();

// setting view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));

let list = ["code and watch anime", "Slackline tonight"];

// ROUTES 
app.get("/home", function(req, res) {
    res.render("index.ejs", { list: list });

});

// POST /ninja
app.post("/ninja", function(req, res) {
    console.log(req.body.taskItem);
    list.push(req.body.taskItem);
    res.render("index.ejs", { list: list });
});

// server listen
app.listen(3000, function(){
    console.log("server is lit!!!!!!");
});
 