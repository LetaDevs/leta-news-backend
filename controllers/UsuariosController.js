import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

import Usuarios from '../models/Usuarios.js';

const crearCuenta = async (req, res) => {
	const {nombre, email, password} = req.body;

	try {
		await Usuarios.create({nombre, email, password});
		return res.status(201).json({code: 200, msg: 'usuario creado correctamente'});
	} catch (error) {
		return res.status(500).json({code: 500, msg: error.errors[0].message});
	}
};

const iniciarSesion = async (req, res) => {
	const {email, password} = req.body;

	try {
		const usuario = await Usuarios.findOne({where: {email: email}});

		if (!usuario.verificarPassword(password)) {
			return res.status(400).json({code: 400, msg: 'password incorrecto'});
		}

		const payload = {
			usuario: {
				id: usuario.id,
				nombre: usuario.nombre,
			},
		};

		jwt.sign(payload, process.env.SECRETA, (error, token) => {
			if (error) throw error;
			return res.status(200).json({code: 200, token});
		});
	} catch (error) {
		return res.status(404).json({code: 404, msg: 'email no registrado'});
	}
};

const obtenerDatosUsuario = async (req, res) => {
	const token = req.header('x-auth-token');

	if (!token) return res.status(401).json({code: 401, msg: 'un token es requerido'});

	try {
		const cifrado = jwt.verify(token, process.env.SECRETA);
		return res.status(200).json({code: 200, usuario: cifrado.usuario});
	} catch (error) {
		return res.status(400).json({code: 400, msg: 'token no válido'});
	}
};

export {crearCuenta, iniciarSesion, obtenerDatosUsuario};
