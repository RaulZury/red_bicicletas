var Bicicleta = require('../../models/bicicleta');

beforeEach(() => {Bicicleta.allBicis= [];});

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
});