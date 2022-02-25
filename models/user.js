'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post,{foreignKey:"userId"})
      this.hasMany(models.Comment,{foreignKey:"userId"})
    }
  }
  User.init({
    username:{
      type:DataTypes.STRING,
      unique:true,
    },
    email: {
      type:DataTypes.STRING,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    followers:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    following:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    password: {
      type:DataTypes.STRING,
    }
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};