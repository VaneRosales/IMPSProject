const pool = require('../config/databaseController');

module.exports = {
    obtenerTodasLasCarreras: async () => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de carreras', error);
        }
    },

    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.affectedRows > 0; // Devuelve true si se eliminó un registro
        } catch (error) {
            console.error('Error al eliminar la carrera', error);
        }
    },

    agregarCarrera: async (carrera) => {
        try {
            const result = await pool.query(
                'INSERT INTO carreras (carrera) VALUES (?)',
                [carrera]
            );
            return result.insertId; // Devuelve el ID del nuevo registro insertado
        } catch (error) {
            console.error('Error al insertar una nueva carrera', error);
        }
    },

    actualizarCarrera: async (idcarrera, carrera) => {
        try {
            const result = await pool.query(
                'UPDATE carreras SET carrera = ? WHERE idcarrera = ?',
                [carrera, idcarrera]
            );
            return result.affectedRows > 0; // Devuelve true si se actualizó un registro
        } catch (error) {
            console.error('Error al actualizar la carrera', error);
        }
    }
};