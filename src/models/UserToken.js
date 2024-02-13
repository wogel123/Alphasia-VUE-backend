const Sequelize = require('sequelize');
const sequelize = require('../lib/database');

const UserToken = sequelize.define('members_tokens', {
  tokenid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: true,
  },
  userid: {
    type: Sequelize.STRING,
    allowNull: false
  },
  expired: {
    type: Sequelize.STRING,
    allowNull: true
  },
  timestamp: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {timestamps: false,});

module.exports = UserToken;