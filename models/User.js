const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Utility function to validate passwords
const validatePassword = (password) => {
  const specialCharRegex = /[!@#$%^&*()]/;
  const numberRegex = /\d/;
  return specialCharRegex.test(password) && numberRegex.test(password);
};

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // Ensure the username is always stored in lowercase
      set(value) {
        this.setDataValue('username', value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'Password must be at least 8 characters long.',
        },
        isValidPassword(value) {
          if (!validatePassword(value)) {
            throw new Error(
              'Password must include at least one special character (!@#$%^&*()) and one number.'
            );
          }
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        return updatedUserData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
