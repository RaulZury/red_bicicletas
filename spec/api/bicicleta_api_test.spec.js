var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');
const { response } = require('../../app');

describe('Bicicleta API', ()=>{
    describe('GET Bicicletas', () =>{
        it('Status 200', ()=>{
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'blanco', 'MTB', [19.47520, -99.04549]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(500);
            });
        });
    });
    describe('POST Bicicletas /create', ()=>{
        it('Status 200', (done)=>{
            var headers = {'content-type': 'aplication/json'};
            var aBici = '{"id": 1, "color": "blanco", "modelo": "MTB", "lat": 19, "lng": -99}';
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(1).color).toBe("blanco");
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
