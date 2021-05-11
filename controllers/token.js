//var Usuario = require('../models/usuario');
var Token = require('../models/Token');
const usuario = require('../models/usuario');

module.exports = {
    confirmationGet: function(req, res, next){
        Token.finOne({ token: req.params,token}, function(err, token){
            if(!token) return res.status(400).send({ type:'not-verified', msg: 'No enconctramos un usuario con ese token'});
            Usuario.findById(token._userId, function(err, usuario){
                if(!usuario) return res.status(400).send({msg: 'No encontramos usuarion con ese id'});
                if(usuario.verificado) return res.redirect('/usuarios');
                usuario.verificado = true;
                usuario.save(function(err){
                    if(err) {return res.status(500).send({msg: err.message});}
                    res.redirect('/');
                });
            });

        });
    }
}