var express = require('express');
var UsuarioControl = require('../controlador/usuarioControl');

var api = express.Router();

api.get('/probando-controlador', UsuarioControl.prueba);
api.post('/registro', UsuarioControl.registrarUsuario);
api.post('/login', UsuarioControl.accesoUsuario);
api.put('/actualizarUsuario/:id', UsuarioControl.actualizarUsuario);

module.exports = api;