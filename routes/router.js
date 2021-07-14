import express from 'express';
import {
	agregarNoticias,
	eliminarNoticias,
	agregarDespues,
	obtenerNoticias,
	obtenerDespues,
} from '../controllers/NoticiasController.js';
import {crearCuenta, iniciarSesion, obtenerDatosUsuario} from '../controllers/UsuariosController.js';

const router = express.Router();

router.post('/api/v1/noticias/agregar', agregarNoticias);
router.delete('/api/v1/noticias/eliminar', eliminarNoticias);
router.get('/api/v1/noticias', obtenerNoticias);

router.post('/api/v1/noticias/leer-despues', agregarDespues);
router.get('/api/v1/noticias/obtener-despues/:usuarioId', obtenerDespues);

router.post('/api/v1/usuarios/crear-cuenta', crearCuenta);
router.post('/api/v1/usuarios/iniciar-sesion', iniciarSesion);
router.get('/api/v1/usuarios/datos', obtenerDatosUsuario);

export default router;
