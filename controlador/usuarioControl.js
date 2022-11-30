const bcrypt = require('bcrypt');
const { param } = require('../app');
var usuariosModelo = require('../modelo/usuarios');
var usuario = new usuariosModelo();

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api REST con node y mongo'
    });

}

function registrarUsuario(req, res) {
    var params = req.body; //recibe todos los datos por el metod post
    console.log(params);

    usuario.nombre = params.nombre;
    // usuario.nombre = params.nombre;
    usuario.apellido = params.apellido;
    usuario.email = params.email;
    usuario.password = params.password;
    usuario.rol = 'ROLE_USER';
    usuario.imagen = 'null';

    if (params.password) {


        bcrypt.hash(params.password, 10, function(err, hash) {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.apellido != null && usuario.email != null) {
                //guardar usuario en la DB
                usuario.save((err, UsuariAlmacenado) => {
                    if (err) {
                        res.status(500).send({
                            message: 'Error al guardar el usuario'
                        });
                    } else {
                        if (!UsuariAlmacenado) {
                            res.status(404).send({ message: 'Nose ha registrado el usuario' })
                        } else {
                            //nos devuelve un objeto con los datos del usuario guardado
                            res.status(200).send({ usuarios: UsuariAlmacenado });
                        }
                    }
                });
            } else {
                res.status(200).send({
                    message: 'Introduce todos los campos'
                });
            }
        });
    } else {
        res.status(500).send({ message: 'Intreoduce la contraseña' })
    }
}

function accesoUsuario(req, res) {
    var params = req.body;
    // var nombre = params.nombre;
    var email = params.email;
    var password = params.password;

    usuariosModelo.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' })
        } else {
            if (!user) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                bcrypt.compare(password, usuario.password, function(err, check) {
                    if (check) {
                        //devolver los datos del usuario legado 
                        console.log('Coincide el password')
                        if (params.gethash) {
                            //devolver un token de jwt
                        } else {
                            res.status(200).send({ user: user });
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no se ha identificado' });
                    }
                });
            }
        }
    });
}

function actualizarUsuario(req, res) { //PUT
    var userId = req.params.id; //GET
    var update = req.body //POST

    usuariosModelo.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'No se ha podido encontar el usuario' });
            } else {
                res.status(200).send({ user: userUpdate });
            }
        }
    });
}
module.exports = {
    prueba,
    registrarUsuario,
    accesoUsuario,
    actualizarUsuario
}