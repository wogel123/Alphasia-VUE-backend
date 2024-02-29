const Sequelize = require('sequelize');
const sequelize = require('../lib/database');

const UserRank = require('../models/UserRank');
const Rank = require('../models/Rank');

const User = sequelize.define('members', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: true,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true
	},
	birthday: {
		type: Sequelize.DATE,
		allowNull: true
	},
	localisation: {
		type: Sequelize.STRING,
		allowNull: true
	},
	sex: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	last_login: {
		type: Sequelize.DATE,
		allowNull: true
	}
});

User.hasMany(UserRank, {
  foreignKey: 'user_id'
})

module.exports = User;