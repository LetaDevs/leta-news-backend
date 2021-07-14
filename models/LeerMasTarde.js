import Sequelize from 'sequelize';
import db from '../config/db.js';

import Noticias from './Noticias.js';
import Usuarios from './Usuarios.js';

const LeerMasTarde = db.define('leerMasTardes', {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		autoIncrement: true,
	},
});

LeerMasTarde.belongsTo(Usuarios);
LeerMasTarde.belongsTo(Noticias);

export default LeerMasTarde;
