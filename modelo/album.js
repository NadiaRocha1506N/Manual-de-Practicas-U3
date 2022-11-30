var mongoose = require('mongoose');
var Shema = mongoose.Schema;

var EsquemaAlbum = Shema({
    titulo: String,
    descripcion: String,
    year: Number,
    imagen: String,
    artista: { type: Shema.ObjectId, ref: "Artista" }
})