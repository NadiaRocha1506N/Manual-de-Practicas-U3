var mongodb = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongodb.connect('mongodb://localhost:27017/proyecto', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("Conexion Exitosa");
        app.listen(port, function() {
            console.log("El servidor api rest de musica escuchando en http://localhost:" + port);
        });
    }
});