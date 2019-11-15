// create a model for our tasks

// exporting this model to our index
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Tasks", {
      // define colums of our table
     title: { type: DataTypes.STRING },
     body: { type: DataTypes.STRING }
  });
  return Task;
};
