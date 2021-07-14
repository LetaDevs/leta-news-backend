import Sequelize from 'sequelize';
import Noticias from '../models/Noticias.js';
import LeerMasTarde from '../models/LeerMasTarde.js';

const agregarNoticias = async (req, res, next) => {
	const {noticias} = req.body;

	if (noticias.length === 0) return next();

	try {
		noticias.forEach((noticia) => {
			Noticias.create(noticia);
		});
		res.status(200).json({code: 200, msg: 'creadas'});
	} catch (error) {
		return res.status(500).json({error});
	}
};

const eliminarNoticias = async (req, res) => {
	const noticias = await Noticias.findAll();

	if (noticias.length === 0) return res.status(200).json({code: 200, msg: 'no hay noticias'});

	try {
		await Noticias.destroy({where: {}, truncate: true});
		return res.status(200).json({code: 200, msg: 'noticias eliminadas'});
	} catch (error) {
		res.status(500).json({code: 500, msg: 'error interno'});
	}
};

const obtenerNoticias = async (req, res) => {
	const Op = Sequelize.Op;

	let request = {};
	if (req.query.length === 0) {
		request = {};
	}
	if (req.query.country && !req.query.category) {
		request = {where: {country: req.query.country}, limit: 20, order: Sequelize.literal('id DESC')};
	}
	if (!req.query.country && req.query.category) {
		request = {where: {category: req.query.category}, limit: 20, order: Sequelize.literal('id DESC')};
	}
	if (req.query.country && req.query.category) {
		request = {
			where: {category: req.query.category, country: req.query.country},
			limit: 20,
			order: Sequelize.literal('id DESC'),
		};
	}
	if (req.query.q) {
		request = {
			where: {country: req.query.country, title: {[Op.like]: `%${req.query.q}%`}},
			limit: 20,
			order: Sequelize.literal('id DESC'),
		};
	}

	try {
		const noticias = await Noticias.findAll(request);
		return res.status(200).json({code: 200, cantidad: noticias.length, noticias});
	} catch (error) {
		res.status(500).json({code: 500, msg: 'error interno'});
	}
};

const agregarDespues = async (req, res) => {
	const {usuarioId, noticiaId} = req.body;

	await LeerMasTarde.create({noticiaId, usuarioId});

	res.status(201).json({code: 201, msg: 'noticia guardada correctamente'});
};

const obtenerDespues = async (req, res) => {
	const {usuarioId} = req.params;

	try {
		const noticias = await LeerMasTarde.findAll({
			include: {model: Noticias},
			where: {usuarioId: usuarioId},
			limit: 20,
			order: Sequelize.literal('id DESC'),
		});
		res.status(200).json({code: 200, noticias});
	} catch (error) {
		res.status(500).json({error});
	}
};

export {agregarNoticias, eliminarNoticias, obtenerNoticias, agregarDespues, obtenerDespues};
