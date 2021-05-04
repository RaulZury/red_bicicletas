var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');
//const { response } = require('../../app');

var base_url = "http://localhost:3000/api/bicicletas";

describe('Bicicleta API', ()=>{
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.conect(mongoDB, {useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to test database');
            done();
        });
    });
    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    describe("GET Bicicletas /", () =>{
        it("Status 200", (done) =>{
            expect(Bicicleta.allBicis.length).toBe(0);

            request.get(base_url, function(error, response, body){
                var result = JSON.parse(body);
                expect(reponse.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe('POST Bicicletas /create', ()=>{
        it('Status 200', (done)=>{
            var headers = {'content-type': 'aplication/json'};
            var aBici = '{"code": 10, "color": "blanco", "modelo": "MTB", "lat": 19, "lng": -99}';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("blanco");
                expect(bici.ubicacion[0]).toBe(19);
                expect(bici.ubicacion[1]).toBe(-99);
                done();
            });
        });
    });

    describe('DELETE Bicicletas /delete', ()=>{
        it('Status 404', (done)=>{
            var aBici2 = new Bicicleta(10, 'blanco', 'MTB', [19.47520, -99.04549]);
            Bicicleta.add(aBici2);

            request.delete({
                url: 'http://localhost:3000/api/bicicletas/'+aBici2
            }, (err, response, body)=>{
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});
