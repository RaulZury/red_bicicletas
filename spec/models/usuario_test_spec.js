var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios',()=>{
    beforeEach((done)=>{
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser:true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console,'connection error'));
        db.once('open',()=>{
            console.log('We are connected to test database!');
            done();
        })
    });
    afterEach((done)=>{
        Reserva.deleteMany({},(err,success)=>{
            if (err) console.log(err);
            Usuario.deleteMany({},(err,success)=>{
                if (err) console.log(err);
                Bicicleta.deleteMany({},(err,success)=>{
                    if (err) console.log(err);
                    done();
                })
            })
        })
    });
    describe('Usuario reserva una bici',() =>{
        it('debe existir la reserva', (done) =>{
            const usuario = new Usuario({nombre:'Zury'});
            usuario.save();
            const bicicleta = new Bicicleta({code:1, color:"roja", modelo:"BMX"});
            bicicleta.save();

            var hoy = new Date();
            var manana = new Date();

            manana.setDate(hoy.getDate()+1);
            usuario.reservar(bicicleta.id,hoy,manana, function(err,reserva){
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err,reservas){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                    
                });
            });
        });
    });
});