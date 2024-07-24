const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');

Blog.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  
  Blog.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
  });
  
  Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
  
  module.exports = {
    User,
    Blog,
    Comment,
  };