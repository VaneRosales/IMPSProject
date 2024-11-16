const pool = require('../config/databaseController');

module.exports = {
    obtenerTodosLosEstudiantes: async () => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de estudiantes', error);
        }
    },

    eliminarEstudiante: async (idestudiante) => {
        try {
            const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    },

    agregarEstudiante: async (nombre, apellido, email, idcarrera, usuario) => {
        try {
            const result = await pool.query(
                'INSERT INTO estudiantes (nombre, apellido, email, idcarrera, usuario) VALUES (?, ?, ?, ?, ?)',
                [nombre, apellido, email, idcarrera, usuario]
            );
            return result.insertId; // Devuelve el ID del nuevo registro insertado
        } catch (error) {
            console.error('Error al insertar un nuevo estudiante', error);
        }
    },

    actualizarEstudiante: async (idestudiante, nombre, apellido, email, idcarrera, usuario) => {
        try {
            const result = await pool.query(
                'UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idestudiante = ?',
                [nombre, apellido, email, idcarrera, usuario, idestudiante]
            );
            return result.affectedRows > 0; // Devuelve true si se actualizó un registro
        } catch (error) {
            console.error('Error al actualizar el estudiante', error);
        }
    }
};