const Sequelize = require('sequelize');
const sequelize = require('../lib/database');

const Article = sequelize.define('articles', {
	author_id: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	slug: {
		type: Sequelize.STRING,
		allowNull: false
	},
	state: {
		type: Sequelize.STRING,
		allowNull: false
	},
	img: {
		type: Sequelize.STRING,
		allowNull: false
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false
	},
	extract: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.STRING,
		allowNull: false
	}
});


module.exports = Article;