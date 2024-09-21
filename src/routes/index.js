const express = require('express');
const router = express.Router();
const estudianteRepository = require('../repositories/EstudianteRepository');

router.get('/', async(req, res)=>{
    const lstEstudiantes = await estudianteRepository.obtenerTodosLosEstudiantes();
    console.log('Listado: ', lstEstudiantes);
    res.send('Bienvenido al laboratorio de IMPS');
})

module.exports = router;