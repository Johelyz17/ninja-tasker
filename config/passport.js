const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require('../models')

// telling passport what strategy to use
// and using email/password
passport.use(
    new LocalStrategy(
        {
            usernameField: "email" 
        },
    function(username, password, done) {
        // when a user attempts to login run this code
      db.User.findOne({ where:{email: email } }).then(function(dbUser){
        //   if there is no user tell them no user my that email register
        if(dbUser){
            return done(null, false, {message: "Incorrect email"});
        }
        // if there is a user but password dont match tell them wrong paswword
        else if (!dbUser.verifyPassword(password)){
            return done(null, false, {message:"incorrect password"});
        }
        // if none of above return user
        return done(null, dbUser);
      });
    }
  )
); 
// strategy for creating a user in our db if he  doesn't already exist 
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback:true
        },
         function(req, email, password, done) {
        // when a user attempts to login run this code
      db.User.findOne({ where:{email: email } }).then(function(dbUser){
        //   if there is no user tell them no user my that email register
        if(dbUser){
            return done(null, false, {message: "Incorrect email"});
        }
        // if there is a user but password dont match tell them wrong paswword
        else if (!dbUser.verifyPassword(password)){
            return done(null, false, {message:"incorrect password"});
        } else {
        // if none of above return user
        db.User.create({
            email: email,
            password:password
        }).then(function(newUser){
            if (!newUser){
                return done(null, false)
            }

            if(newUser){
                return done(null, newUser);
            }
        });
       }       

      });
    }
  )
);

// encrupting users to sessions and out of sessions
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


module.exports = passport;
