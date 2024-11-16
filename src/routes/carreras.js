const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    try {
        const carreras = await queries.obtenerTodasLasCarreras();
        response.render('carreras/listado', { carreras }); // Mostramos el listado de carreras
    } catch (error) {
        console.error('Error al obtener el listado de carreras:', error);
        response.status(500).send('Error al obtener el listado de carreras');
    }
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async (request, response) => {
    response.render('carreras/agregar'); // Renderizamos el formulario
});

// Endpoint para agregar una nueva carrera
router.post('/agregar', async (request, response) => {
    try {
        // Extraemos los datos enviados en el formulario
        const { carrera } = request.body;

        // Validamos que el campo de la carrera no esté vacío
        if (!carrera) {
            console.error('El campo de la carrera está vacío');
            return response.status(400).send('El nombre de la carrera es obligatorio');
        }

        // Llamamos al método para agregar la nueva carrera
        const resultado = await queries.agregarCarrera(carrera);

        if (resultado) {
            console.log('Carrera agregada con éxito');
            response.redirect('/carreras'); // Redirigimos al listado
        } else {
            console.error('Error al agregar la carrera');
            response.status(500).send('No se pudo agregar la carrera');
        }
    } catch (error) {
        console.error('Error al agregar la carrera:', error);
        response.status(500).send('Error interno al agregar la carrera');
    }
});

// Endpoint que permite eliminar una carrera
router.get('/eliminar/:idcarrera', async (request, response) => {
    try {
        // Desestructuramos el objeto que nos mandan en la petición y extraemos el idcarrera
        const { idcarrera } = request.params;

        // Llamamos al método para eliminar la carrera
        const resultado = await queries.eliminarCarrera(idcarrera);

        if (resultado) {
            console.log('Carrera eliminada con éxito');
        } else {
            console.error('No se pudo eliminar la carrera');
        }

        response.redirect('/carreras');
    } catch (error) {
        console.error('Error al eliminar la carrera:', error);
        response.status(500).send('Error interno al eliminar la carrera');
    }
});

module.exports = router;