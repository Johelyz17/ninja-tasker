// packages
const express= require("express")
const bodyParser = require("body-parser");
const db = require("./models/index.js");

// starting express app
const app = express();

// setting view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.delete("/delete/:index", function(req, res) {
    console.log(req.params.index);

    list.splice(req.params.index, 1);

    res.json(list);
});

db.sequelize.sync().then(function(){
    // server listen
      app.listen(3000, function(err){
          if (err) console.log(err);
          console.log("server is lit!!!!!!");
    });
});
