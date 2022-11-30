var mongoose = require('mongoose');
var Shema = mongoose.Schema;

var EsquemaCancion = Shema({
    numero: String,
    nombre: String,
    duracion: String,
    file: String,
    album: { type: Shema.ObjectId, ref: "Album" }
});

module.exports = mongoose.model('Cancion', EsquemaCancion);