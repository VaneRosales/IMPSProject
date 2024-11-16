const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    try {
        const estudiantes = await queries.obtenerTodosLosEstudiantes();
        response.render('estudiantes/listado', { estudiantes }); // Mostramos el listado de estudiantes
    } catch (error) {
        console.error('Error al obtener el listado de estudiantes:', error);
        response.status(500).send('Error al obtener el listado de estudiantes');
    }
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async (request, response) => {
    response.render('estudiantes/agregar'); // Renderizamos el formulario
});

// Endpoint para agregar un estudiante
router.post('/agregar', async (request, response) => {
    try {
        // Extraemos los datos enviados en el formulario
        const { nombre, apellido, email, idcarrera, usuario } = request.body;

        // Validamos que todos los datos necesarios estén presentes
        if (!nombre || !apellido || !email || !idcarrera || !usuario) {
            console.error('Datos incompletos para agregar el estudiante');
            return response.status(400).send('Todos los campos son obligatorios');
        }

        // Llamamos al método para agregar el estudiante
        const resultado = await queries.agregarEstudiante(nombre, apellido, email, idcarrera, usuario);

        if (resultado) {
            console.log('Estudiante agregado con éxito');
            response.redirect('/estudiantes'); // Redirigimos al listado
        } else {
            console.error('Error al agregar el estudiante');
            response.status(500).send('No se pudo agregar el estudiante');
        }
    } catch (error) {
        console.error('Error al agregar el estudiante:', error);
        response.status(500).send('Error interno al agregar el estudiante');
    }
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async (request, response) => {
    try {
        // Desestructuramos el objeto que nos mandan en la petición y extraemos el idestudiante
        const { idestudiante } = request.params;

        // Llamamos al método para eliminar el estudiante
        const resultado = await queries.eliminarEstudiante(idestudiante);

        if (resultado) {
            console.log('Estudiante eliminado con éxito');
        } else {
            console.error('No se pudo eliminar el estudiante');
        }

        response.redirect('/estudiantes');
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        response.status(500).send('Error interno al eliminar el estudiante');
    }
});

module.exports = router;