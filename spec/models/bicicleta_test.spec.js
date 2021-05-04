var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('testing bicicletas', function(){
    beforeAll((done)=>{
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB,{useNewUrlParser:true});
        const db = mongoose.connection;
        db.on('error',console.error.bind(console,'connection error'));
        db.once('open',()=>{
            console.log('We are connected to test database!');
            done();
        })
    });
    afterEach((done)=>{
        Bicicleta.deleteMany({},(err,success)=>{
            if(err) console.log(err);
            done();
        })
    });
    describe('Bicicleta.createInstance',()=>{
        it('crea una instancia de Bicicleta',()=>{
            var bici = Bicicleta.createInstance(1,"verde","urbana",[19,-99]);
            expect(bici.code).toBe(1)
            expect(bici.color).toBe("verde")
            expect(bici.modelo).toBe("urbana")
            expect(bici.ubicacion[0]).toBe(19)
            expect(bici.ubicacion[1]).toBe(-99)
        })
    })
    describe('Bicicleta.allBicis',()=>{
        it('comienza vacia',(done)=>{
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });
    describe('Bicicleta.add',()=>{
        it('agrega una bici',(done)=>{
            var bici = new Bicicleta({code:1,color:"verde",modelo:"urbana"})
            Bicicleta.add(bici,(err,newBici)=>{
                if(err) console.log(err);
                Bicicleta.allBicis((err,bicis)=>{
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(bici.code);
                    done();
                });
            });
        });
    });
    describe('Bicicleta.findByCode', ()=>{
        it('Debe devolver bici con code 1', (done)=>{
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta({code: 1, color: "amarilla", modelo: "MTB"});
                Bicicleta.add(aBici, function(err, newBici){
                    if(err) console.log(err);
                
                    var aBici2 = new Bicicleta({code: 2, color: "rojo", modelo: "carrera"});
                    Bicicleta.add(aBici2, function(err, newBici){
                        if(err) console.log(err);
                        Bicicleta.findByCode(1, function(err, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });
});

/*beforeEach(() => {Bicicleta.allBicis= [];});

describe('Bicicleta.allBicis', ()=>{
    it('comienza vacía', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', ()=>{
    it('agregamos una', ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);

        var a = new Bicicleta(1, 'rojo', 'urbana', [19.47520, -99.04549]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('Devolver bici Id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, 'verde', 'urbana', [19.47520, -99.04549]);
        var aBici2 = new Bicicleta(2, 'naranja', 'MTB', [19.47520, -99.04549]);
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
   
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);
    });
});

describe('Bicicleta.removeById',()=>{
    it('Elimina bicicleta con id 1',()=>{
    var aBici= new Bicicleta(1,'verde','urbana', [19.47520, -99.04549]);
    var aBici2= new Bicicleta(2,'rojo','MTB', [19.47520, -99.04549]);
    Bicicleta.add(aBici);
    Bicicleta.add(aBici2);
    Bicicleta.removeById(1);
    });
});*/