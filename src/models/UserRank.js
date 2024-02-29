const Sequelize = require('sequelize');
const sequelize = require('../lib/database');
const {DataTypes} = require("sequelize");

const Rank = require('../models/Rank')

const UserRank = sequelize.define('members_ranks', {
	user_id: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	rank_id: {
		type: Sequelize.STRING,
		allowNull: true
	}
}, {timestamps: false,});

UserRank.hasOne(Rank, {
	foreignKey: 'id',
	sourceKey: 'rank_id'
})

module.exports = UserRank;