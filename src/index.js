const express = require('express');

//inicializando
const app = express();

require('dotenv').config();
//ajustes del servidor

app.set("port", process.env.PORT || 4500)

app.use(require('./routes'))


//inicializando el servidor
app.listen(app.get('port'), () => {
    console.log("Servidor iniciado en el puerto "+ app.get('port'));
})  