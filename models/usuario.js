var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;
const Token = require('../models/Token');
const mailer = require('../mailer/mailer');

const validateEmail = function(email){
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
};
var usuarioSchema = new Schema({
    nombre: {
        type: String, 
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'EL email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor ingresa un email válido'],
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']

    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if (this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.resetPassword = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save(function(err){
        if (err) {return cb(err);}

        const mailOptions = {
            from: 'no-reply@redbibicletas.com',
            to: email_destination,
            subject: 'Reseteo de password de cuenta',
            text: 'Hola,\n\n' + 'Para resetear el password de su cuenta haga click en este URL: \n'+
            'http://localhost:3000'+ '\/resetPassword\/' + token.token + '.\n'
        };

        mailer.sendMail(mailOptions, function(err){
            if (err){return cb(err);}

            console.log('Se envio un email para resetear el password a : '+ email_destination + '.');
        });
        cb(null);
    });
}

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde:desde, hasta: hasta});
    console.log(reserva);
    reserva.save(cb);
}

usuarioSchema.methods.enviar_email_bienvenida = function(cb){
    const token = new Token({_userId: this.id, token: crypto.randomBytes[16].toString('hex')});
    const email_destination = this.mail;
    token.save(function(err){
        if(err){return console.log(err, message);}

        const mailOptions = {
            from: 'no-reply@redbicicletas.com',
            to: email_destination,
            subject: 'Verificacion de cuenta',
            text: 'Hola,\n\n'+ 'Favor de verificar su cuenta haciendo click en el siguiente enlace\n'+ 'http://localhost:3000'+ '\/token/confirmation\/'+ token.token +'.\n'
        };

        mailer.sendMail(mailOptions, function(err){
            if(err) {return console.log(err.message);}
            console.log('A vefirication email has been send to '+ email_destination + '.');
        });
    });
}

module.exports = mongoose.model('Usuario', usuarioSchema);