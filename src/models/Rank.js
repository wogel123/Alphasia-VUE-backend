const Sequelize = require('sequelize');
const sequelize = require('../lib/database');

const Rank = sequelize.define('site_ranks', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	color: {
		type: Sequelize.STRING,
		allowNull: false
	}
}, {timestamps: false,});


module.exports = Rank;