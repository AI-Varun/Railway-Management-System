const Sequelize = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  roles: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  secretKey: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = User;
