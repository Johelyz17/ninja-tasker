// packages
const express= require("express")
const bodyParser = require("body-parser");
const db = require("./models/index.js");
const routes = require("./routes");
const passport = require("./config/passport");
const session = require("express-session");

// starting express app
const app = express();

// setting view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({secret:"Cohort orlando", resave: true, saveUnitialized: true})
);
app.use(passport.initialize());
app.use(passport.session());

// let list = ["code and watch anime", "Slackline tonight"];

// // ROUTES 
// app.get("/home", function(req, res) {
//     res.render("index.ejs", { list: list });

// });

// // POST /ninja
// app.post("/ninja", function(req, res) {
//     console.log(req.body.taskItem);
//     list.push(req.body.taskItem);
//     res.render("index.ejs", { list: list });
// });

// app.delete("/delete/:index", function(req, res) {
//     console.log(req.params.index);

//     list.splice(req.params.index, 1);

//     res.json(list);
// });

// routing manager
app.use(routes);

db.sequelize.sync().then(function(){
    // server listen
      app.listen(3000, function(err){
          if (err) console.log(err);
          console.log("server is lit!!!!!!");
    });
});
