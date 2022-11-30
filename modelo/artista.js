var mongoose = require('mongoose');
var Shema = mongoose.Schema;

var EsquemaArtistas = Shema({
    nombre: String,
    descripcion: String,
    imagen: String
});

module.exports = mongoose.model('Artista', EsquemaArtistas);