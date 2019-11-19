const bcrypt = require("bcryptjs")
// create a model for our tasks
const db = require('../models/index')

// exporting this model to our index
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("Users", {
        // define colums of our table
       email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });

    // create custome methods for our model
    User.prototype.verifyPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };

    // hooks happen on  specific scenarios

    // encrypting users password
    User.addHook("beforeCreate", function(user){
        user.password = bcrypt.hashSync(
        User.password,
        bcrypt.genSaltSync(10), 
        null
        );
    });

    return User;
  };
  