import Sequelize from 'sequelize';
import db from '../config/db.js';

const Noticias = db.define('noticias', {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		autoIncrement: true,
	},
	author: Sequelize.STRING,
	title: Sequelize.STRING,
	description: Sequelize.STRING,
	publishedAt: Sequelize.DATE,
	url: Sequelize.STRING,
	urlToImage: Sequelize.STRING,
	country: Sequelize.STRING,
	category: Sequelize.STRING,
});

export default Noticias;
