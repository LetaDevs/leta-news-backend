import Sequelize from 'sequelize';
import db from '../config/db.js';
import bcrypt, {genSaltSync} from 'bcrypt-nodejs';

const Usuarios = db.define(
	'usuarios',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		nombre: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			unique: {
				args: true,
				msg: 'Email ya registrado',
			},
		},
		password: {
			type: Sequelize.STRING,
		},
	},
	{
		hooks: {
			beforeCreate(datos) {
				datos.password = bcrypt.hashSync(datos.password, genSaltSync(10));
			},
		},
	}
);

Usuarios.prototype.verificarPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

export default Usuarios;
