var mongoose = require('mongoose');
var Shema = mongoose.Schema;


var EsquemaUsuarios = Shema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,
    imagen: String
});


module.exports = mongoose.model('Usuarios', EsquemaUsuarios);