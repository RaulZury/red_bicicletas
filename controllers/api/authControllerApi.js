const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: function(req, res, next){
        Usuario.findOne({email: req.body.email}, function(err, userInfo){
            if(err){
                next(err);
            }else{
                if(userInfo==null){return res.status(401).json({status:"error", message: "user/password invalid", data:null});}
                if(userInfo !=null && bcrypt.compareSync(req.body.password, userInfo.password)){
                    userInfo.save(function(err, usuario){
                        const token = jwt.sign({id: usuario._id}, req.app.get('secretKey'), {expiresIn: '7d'});
                        res.status(200).json({message:"usuario encontrado", data: {usuario: usuario, token:token}});
                    });
                }else{
                    res.status(401).json({status:"error", message:"user/password invalid", data:null});
                }
            }
        });
    },
    forgotPassword: function(req, res, next){
        Usuario.findOne({email:req.body.email}, function(err, usuario){
            if(!usuario) return res.status(401).json({message: "No existe el usuario", data:null});
            usuario.resetPassword(function(err){
                if(err){return next(err);}
                res.status(200).json({message: "se envió correo para restablecimiento de password", data:null});
            });
        })
    }
}