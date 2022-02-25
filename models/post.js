'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'userId'})
    }
  }
  Post.init({
    title:{
      type:DataTypes.STRING,
      allowNull:false
    },
    body:{
      type:DataTypes.STRING,
      allowNull:false
    },
    likes:{
      type:DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};